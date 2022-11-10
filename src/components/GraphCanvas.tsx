import ForceGraph2D from "react-force-graph-2d";
import { useProjectAssets } from "../contexts/ProjectAssetsContext";
import { useState, useEffect, useRef } from "react";

type Link = {
  source: string;
  target: string;
  name: string;
  nodePairId?: string;
  linkCurvature?: number;
  width?: number;
};

export default function GraphCanvas() {
  let selfLoopLinks: { [key: string]: Link[] } = {};
  let sameNodesLinks: { [key: string]: Link[] } = {};
  let maxExistingWidth: number = 0;
  const linkCurvatureMinMax = 0.5;
  const maxLinkWidth = 6;

  const { connections, devices, locations } = useProjectAssets();
  const nodes = devices.map((device) => ({
    id: device.id,
    name: device.name,
    location: device.location,
  }));
  const links = connections
    .sort((a, b) => {
      let valA =
        Math.round(
          a.cable
            .replaceAll(",", ".")
            .split("x")
            .reduce((total, current) => total * parseFloat(current), 1) * 100
        ) / 100;
      let valB =
        Math.round(
          b.cable
            .replaceAll(",", ".")
            .split("x")
            .reduce((total, current) => total * parseFloat(current), 1) * 100
        ) / 100;

      const maxVal = Math.max(valA, valB);
      if (maxVal > maxExistingWidth) maxExistingWidth = maxVal;
      return valA - valB;
    })
    .map((connection) => {
      let calculatedWidth =
        ((Math.round(
          connection.cable
            .replaceAll(",", ".")
            .split("x")
            .reduce((total, current) => total * parseFloat(current), 1) * 100
        ) /
          100) *
          maxLinkWidth) /
        maxExistingWidth;
      calculatedWidth;

      if (calculatedWidth < 1) calculatedWidth = 1;
      return {
        source: connection.device1,
        target: connection.device2,
        name: connection.cable,
        nodePairId: "",
        width: calculatedWidth,
      };
    });

  const gData = {
    nodes: nodes,
    links: links,
  };

  // 1. assign each link a nodePairId that combines their source and target independent of the links direction
  // 2. group links together that share the gitsame two nodes or are self-loops
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

  // Compute the linkCurvature for self-loop links to avoid overlaps
  Object.keys(selfLoopLinks).forEach((id) => {
    let links = selfLoopLinks[id];
    let lastIndex = links.length - 1;
    links[lastIndex].linkCurvature = 1;
    let delta = (1 - linkCurvatureMinMax) / lastIndex;
    for (let i = 0; i < lastIndex; i++) {
      links[i].linkCurvature = linkCurvatureMinMax + i * delta;
    }
  });

  // Compute the linkCurvature for links sharing the same two nodes to avoid overlaps
  Object.keys(sameNodesLinks)
    .filter((nodePairId) => sameNodesLinks[nodePairId].length > 1)
    .forEach((nodePairId) => {
      let links = sameNodesLinks[nodePairId];
      let lastIndex = links.length - 1;
      let lastLink = links[lastIndex];
      lastLink.linkCurvature = linkCurvatureMinMax;
      let delta = (2 * linkCurvatureMinMax) / lastIndex;
      for (let i = 0; i < lastIndex; i++) {
        (links[i].linkCurvature as number) = -linkCurvatureMinMax + i * delta;
        if (lastLink.source !== links[i].source) {
          links[i].linkCurvature = (links[i].linkCurvature as number) * -1; // flip it around, otherwise they overlap
        }
      }
    });

  return (
    <ForceGraph2D
      graphData={gData}
      linkCurvature="linkCurvature"
      nodeAutoColorBy="location"
      linkWidth="width"
      width={1000}
      enableZoomInteraction={false}
    />
  );
}
