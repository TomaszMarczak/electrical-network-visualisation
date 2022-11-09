import ForceGraph2D from "react-force-graph-2d";
import { useProjectAssets } from "../contexts/ProjectAssetsContext";
import { useState, useEffect, useRef } from "react";

type Link = {
  source: string;
  target: string;
  name: string;
  nodePairId?: string;
  curvature?: number;
};

export default function GraphCanvas() {
  const { connections, devices, locations } = useProjectAssets();
  const nodes = devices.map((device) => ({ id: device.id, name: device.name }));
  const links = connections.map((connection) => ({
    source: connection.device1,
    target: connection.device2,
    name: connection.name,
    nodePairId: "",
  }));

  const gData = {
    nodes: nodes,
    links: links,
  };

  let selfLoopLinks: { [key: string]: Link[] } = {};
  let sameNodesLinks: { [key: string]: Link[] } = {};
  const curvatureMinMax = 0.5;

  // 1. assign each link a nodePairId that combines their source and target independent of the links direction
  // 2. group links together that share the same two nodes or are self-loops
  gData.links.forEach((link) => {
    link.nodePairId =
      link.source <= link.target
        ? link.source + "_" + link.target
        : link.target + "_" + link.source;
    let map = link.source === link.target ? selfLoopLinks : sameNodesLinks;
    if (!map[link.nodePairId]) {
      map[link.nodePairId] = [];
    }
    map[link.nodePairId].push(link);
  });

  // Compute the curvature for self-loop links to avoid overlaps
  Object.keys(selfLoopLinks).forEach((id) => {
    let links = selfLoopLinks[id];
    let lastIndex = links.length - 1;
    links[lastIndex].curvature = 1;
    let delta = (1 - curvatureMinMax) / lastIndex;
    for (let i = 0; i < lastIndex; i++) {
      links[i].curvature = curvatureMinMax + i * delta;
    }
  });

  // Compute the curvature for links sharing the same two nodes to avoid overlaps
  Object.keys(sameNodesLinks)
    .filter((nodePairId) => sameNodesLinks[nodePairId].length > 1)
    .forEach((nodePairId) => {
      let links = sameNodesLinks[nodePairId];
      let lastIndex = links.length - 1;
      let lastLink = links[lastIndex];
      lastLink.curvature = curvatureMinMax;
      let delta = (2 * curvatureMinMax) / lastIndex;
      for (let i = 0; i < lastIndex; i++) {
        (links[i].curvature as number) = -curvatureMinMax + i * delta;
        if (lastLink.source !== links[i].source) {
          links[i].curvature = (links[i].curvature as number) * -1; // flip it around, otherwise they overlap
        }
      }
    });

  return (
    <ForceGraph2D
      graphData={gData}
      width={1000}
      enableZoomInteraction={false}
    />
  );
}
