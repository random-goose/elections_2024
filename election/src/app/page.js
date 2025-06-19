'use client';

import Frameg from './Framesg';
import ToggleSwitch from './Political_Ads/Facebook_Graphs/toggleButtons.js';
import ClassificationReportBarplot from './FakeNewsPlot'
import ClassificationReportBarplotMemes from './ToxicMemesPlot'
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.css';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import Form from 'react-bootstrap/Form';
import * as d3 from "d3";
import { useState, useEffect } from "react";
import Top from './Top.js'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Select from 'react-select';
import About from './About.js'
import { Slide } from 'react-slideshow-image';
import { Timeline } from 'react-twitter-widgets'
import Figure from 'react-bootstrap/Figure';
import { Modal } from 'bootstrap';
import cytoscape from 'cytoscape';
import { xml2js } from 'xml-js';
import Accordion from 'react-bootstrap/Accordion';
import './page.module.css'
import Citation from './Citation.js';
import Graph from 'react-graph-vis';
import ReactDatePicker from 'react-datepicker';
import MagnifierImage from './MagnifierImage'; // adjust path as needed
export default function Home() {

 // let Comm_keywords=[]
 // let checkbox_status={}
 //   Comm_keywords=[
 //     { label: "BJP", value: "BJP" },
 //     { label: "Congress", value: "Congress" },
 //     { label: "Aam Aadmi Party", value: "Aam Aadmi Party" },
 //     { label: "2024 Elections India", value: "2024 Elections India" },
 //     { label: "Indian Election", value: "Indian Election" },
 //     { label: "Indian Voting", value: "Indian Voting" },
 //     { label: "Lok Sabha", value: "Lok Sabha" },
 //     { label: "Telugu Desam Party", value: "Telugu Desam Party" },
 //     { label: "Trinamool Congress", value: "Trinamool Congress" },
 //     { label: "Samajwadi Party", value: "Samajwadi Party" },
 //     { label: "AIADMK", value: "AIADMK" },
 //     { label: "Narendra Modi", value: "Narendra Modi" },
 //     { label: "Rahul Gandhi", value: "Rahul Gandhi" }
 // ];
 const options = {
  layout: {
   hierarchical: false
  },
  edges: {
   color: '#000000'
  }
 }
 let Comm_keywords_quora = [
  { label: "BJP", value: "BJP" }, //
  { label: "Congress", value: "Congress" }, //
  { label: "Aam Aadmi Party", value: "AamAadmiParty" }, // 
  { label: "2024 Elections India", value: "2024ElectionsIndia" },
  { label: "Lok Sabha", value: "LokSabha" }, //
  { label: "Telugu Desam Party", value: "TeluguDesamParty" }, // 
  { label: "Trinamool Congress", value: "TrinamoolCongress" },
  { label: "Samajwadi Party", value: "SamajwadiParty" }, //
  { label: "AIADMK", value: "AIADMK" },
  { label: "Narendra Modi", value: "NarendraModi" }, //
  { label: "Rahul Gandhi", value: "RahulGandhi" } //
 ];


 let Comm_keywords_sharechat = [
  // { label: "0", value: "0" },
  // { label: "1", value: "1" }
  { label: "BJP", value: "BJP" },
  { label: "Congress", value: "INC" },
  { label: "Aam Aadmi Party", value: "AAP" },
  { label: "Telugu Desam Party", value: "TDP" }, // 
  { label: "Samajwadi Party", value: "Samajwadi Party" }, //
  { label: "Narendra Modi", value: "Narendra Modi" }, //
  { label: "Rahul Gandhi", value: "Rahul Gandhi" },
  { label: "Lok Sabha", value: "Lok Sabha Elections" } //
 ];

 let checkbox_status_sharechat = {

  // "0": false,
  // "1": false
  "BJP": false,
  "Congress": false,
  "Aam Aadmi Party": false,
  "Telugu Desam Party": false,
  "Samajwadi Party": false,
  "Narendra Modi": false,
  "Rahul Gandhi": false,
  "Lok Sabha": false

 }
 let checkbox_status_quora = {
  "BJP": false,
  "Congress": false,
  "AamAadmiParty": false,
  "2024ElectionsIndia": false,
  "LokSabha": false,
  "TeluguDesamParty": false,
  "TrinamoolCongress": false,
  "SamajwadiParty": false,
  "AIADMK": false,
  "NarendraModi": false,
  "RahulGandhi": false
 }



 const [submitted, setSubmitted] = useState(false);

 const [Fakenews, setFakenews] = useState("");
 const [ads, setAds] = useState("");
 const [adsres, setAdsres] = useState([]);
 const [fakenesres, setfakenesres] = useState("");
 const [framingurl, setFramingUrl] = useState("");
 const [fakenewsemail, setfakenewsemail] = useState("");
 const [framingres, setframingres] = useState("");
 const [Fakenewsurl, setFakenewsurl] = useState("");
 const [selectedOption, setSelectedOption] = useState([]);
 const [memesurl, setmemesurl] = useState("");
 const [framingtext, setFramingtext] = useState("");
 const [memsres, setmemsres] = useState("");
 const [memesText, setMemesText] = useState("");
 const [ComDec, setComDec] = useState("");
 const [CommunityDetectionDate, setCommunityDetectionDate] = useState();
 const [ComDecs, setComDecs] = useState(false);

 const [Commval, setCommval] = useState(false);
 const [Commvalf, setCommvalf] = useState(false);
 const [data, setData] = useState([]);
 const [visitorCount, setVisitorCount] = useState(0);
 const [toxicpath, settoxicpath] = useState('24973.png');
 const [cy, setCy] = useState(null);
 const [graphData, setGraphData] = useState(null);
 const [graphdata, setgraphdata] = useState({ nodes: [], edges: [] });
 const [coomunityoption, setCommunityOption] = useState("");
 const [Comm_keywords, setComm_keywords] = useState([{}]);
 const [checkbox_status, setcheckbox_status] = useState([{}])
 const [Comm_selected, setComm_selected] = useState({});
 const [kValue, setKValue] = useState(null);
 const [randomSeed, setRandomSeed] = useState(null);
 const [samplingStrategy, setSamplingStrategy] = useState('');
 const [imageUrls, setImageUrls] = useState([]);
 // const url="http://localhost:3500/";
 console.log("process.env.REACT_EXPRESS_API_URL", process.env.NEXT_PUBLIC_EXPRESS_API_URL)
 const url = process.env.NEXT_PUBLIC_EXPRESS_API_URL
 const fetchData = async () => {
  try {
   const response = await fetch(url + 'increment-count');
   if (!response.ok) {
    throw new Error('Network response was not ok');
   }
   const data = await response.json();
   setVisitorCount(data.count);
  } catch (error) {
   console.error('Error:', error);
  }
 };

 useEffect(() => {
  fetchData();
 }, []);
 const handleCheckboxChange = (checkboxName) => {
  Comm_selected[checkboxName] = !Comm_selected[checkboxName],
   console.log(Comm_selected)
  setComm_selected(Comm_selected);
  console.log(Comm_selected)

 };

 const SubmitFakeNews = async (e) => {
  e.preventDefault();


  let formData = new FormData()
  formData.append("image", Fakenewsurl, Fakenewsurl.name)
  formData.append("text", Fakenews)
  formData.append("Email", fakenewsemail)
  let header = {

   method: "POST",
   body: formData


  }


  await fetch(url + 'Fakenews', header)
   .then(response => response.json())
   .then(request => {
    setfakenesres("You will be mailed")


   })

 }
 const graph = {
  nodes: [
   { id: 1, label: 'Node 1' },
   { id: 2, label: 'Node 2' },
   { id: 3, label: 'Node 3' }
  ],
  edges: [
   { from: 1, to: 2 },
   { from: 2, to: 3 },
   { from: 3, to: 1 }
  ]
 };


 const SubmitMemes = async (e) => {
  e.preventDefault();
  let formData = new FormData()
  formData.append("image", memesurl, memesurl.name)
  formData.append("text", memesText)
  formData.append("filename", memesurl.name)


  let header = {


   method: "POST",
   body: formData


  }


  await fetch(url + 'Memes', header)
   .then(response => response.json())
   .then(request => {
    setmemsres(request.Meme)
    settoxicpath(request.file)


   })

 }
 // polticalads

 const polticalads = async (e) => {

  e.preventDefault();
  //  e.checkValidity();
  let header = {

   headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
   },
   method: "POST",
   body: JSON.stringify({ "PartyName": ads })
  }


  await fetch(url + 'polads', header)
   .then(response => response.json())
   .then(request => {
    console.log("request", request)
    setAdsres(request.Ads)


   })

 }

 const SubmitFraming = async (e) => {

  e.preventDefault();
  //  e.checkValidity();
  let header = {

   headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
   },
   method: "POST",
   body: JSON.stringify({ "framingurl": framingurl })
  }


  await fetch(url + 'Framing', header)
   .then(response => response.json())
   .then(request => {
    console.log("request", request)
    setframingres(request.Frame)


   })

 }

 // const NetworkGraph = async (e) => {

 //     // let temp=e
 //     console.log('e.nodes',e.nodes)

 //       let i;
 //           let data = e; 
 //           const margin = { top: 20, right: 20, bottom: 20, left: 20 }; 
 //           const nodeRadius = 5; 

 //           const numNodes = data.nodes.length;
 //           const width = Math.max(400, Math.min(2000, numNodes * 2 * nodeRadius)) + margin.left + margin.right;
 //           const height = Math.max(400, Math.min(1000, numNodes * 2 * nodeRadius)) + margin.top + margin.bottom;

 //           d3.select('#network-graph-container').selectAll("*").remove();

 //           const svg = d3.select('#network-graph-container')
 //               .append('svg')
 //               .attr('width', width)
 //               .attr('height', height);

 //           const simulation = d3.forceSimulation(data.nodes)
 //               .force('link', d3.forceLink(data.edges).id(d => d.id))
 //               .force('charge', d3.forceManyBody())
 //               .force('center', d3.forceCenter(width / 2, height / 2));

 //           const link = svg.append('g')
 //               .attr('class', 'links')
 //               .selectAll('line')
 //               .data(data.edges)
 //               .enter()
 //               .append('line')
 //               .style("stroke", "#aaa");
 //           console.log('data.nodes',data.nodes)
 //           const node = svg.append('g')
 //               .attr('class', 'nodes')
 //               .selectAll('circle')
 //               .data(data.nodes)
 //               .enter()
 //               .append('circle')
 //               .attr('r', nodeRadius)
 //               // .attr('fill', d => d.color);

 //           simulation.on('tick', () => {
 //               link
 //                   .attr('x1', d => d.source.x)
 //                   .attr('y1', d => d.source.y)
 //                   .attr('x2', d => d.target.x)
 //                   .attr('y2', d => d.target.y);

 //               node
 //                   .attr('cx', d => d.x)
 //                   .attr('cy', d => d.y);
 //           });



 //       // setComDec(temp);





 // }



 // const NetworkGraph = async (e) => {
 //   console.log('e.nodes', e.nodes);

 //   let data = e;
 //   const margin = { top: 20, right: 20, bottom: 20, left: 20 };
 //   const nodeRadius = 5;

 //   const numNodes = data.nodes.length;
 //   const width = Math.max(400, Math.min(2000, numNodes * 2 * nodeRadius)) + margin.left + margin.right;
 //   const height = Math.max(400, Math.min(1000, numNodes * 2 * nodeRadius)) + margin.top + margin.bottom;

 //   d3.select('#network-graph-container').selectAll("*").remove();

 //   const svg = d3.select('#network-graph-container')
 //       .append('svg')
 //       .attr('width', width)
 //       .attr('height', height)
 //       .call(d3.zoom().on("zoom", function () {
 //           svg.attr("transform", d3.event.transform);
 //       }))
 //       .append("g");

 //     const colorScale = d3.scaleOrdinal(d3.schemeCategory10)
 //           .domain([...new Set(data.nodes.map(node => node.search_term))]);

 //           data.nodes.forEach(node => {
 //           node.color = colorScale(node.search_term);
 //       });

 //   const simulation = d3.forceSimulation(data.nodes)
 //       .force('link', d3.forceLink(data.edges).id(d => d.id))
 //       .force('charge', d3.forceManyBody())
 //       .force('center', d3.forceCenter(width / 2, height / 2));

 //   const link = svg.append('g')
 //       .attr('class', 'links')
 //       .selectAll('line')
 //       .data(data.edges)
 //       .enter()
 //       .append('line')
 //       .style("stroke", "#aaa");

 //   const node = svg.append('g')
 //       .attr('class', 'nodes')
 //       .selectAll('circle')
 //       .data(data.nodes)
 //       .enter()
 //       .append('circle')
 //       .attr('r', nodeRadius)
 //       .attr('fill', d => d.color);

 //   simulation.on('tick', () => {
 //       link
 //           .attr('x1', d => d.source.x)
 //           .attr('y1', d => d.source.y)
 //           .attr('x2', d => d.target.x)
 //           .attr('y2', d => d.target.y);

 //       node
 //           .attr('cx', d => d.x)
 //           .attr('cy', d => d.y);
 //   });

 // }

 // function getShape(search_term) {
 //   switch (search_term) {
 //     case 'bjp':
 //       return 'ellipse';
 //     case 'congress':
 //       return 'square';
 //     case 'search_term_3':
 //       return 'triangle';
 //     case 'search_term_4':
 //       return 'diamond';
 //     case 'search_term_5':
 //       return 'pentagon';
 //     case 'search_term_6':
 //       return 'hexagon';
 //     case 'search_term_7':
 //       return 'star';
 //     case 'search_term_8':
 //       return 'cross';
 //     case 'search_term_9':
 //       return 'plus';
 //     case 'search_term_10':
 //       return 'ellipse';
 //     case 'search_term_11':
 //       return 'rect';
 //     case 'search_term_12':
 //       return 'line';
 //     case 'search_term_13':
 //       return 'path';
 //     default:
 //       return 'circle'; // Default shape
 //   }
 // }


 // const NetworkGraph = async (e) => {
 //   let data = e;
 //   const margin = { top: 20, right: 20, bottom: 20, left: 20 };
 //   const nodeRadius = 5;

 //   const numNodes = data.nodes.length;
 //   const width = Math.max(400, Math.min(2000, numNodes * 2 * nodeRadius)) + margin.left + margin.right;
 //   const height = Math.max(400, Math.min(1000, numNodes * 2 * nodeRadius)) + margin.top + margin.bottom;

 //   d3.select('#network-graph-container').selectAll("*").remove();
 //   const svg = d3.select('#network-graph-container')
 //   .append('svg')
 //   .attr('width', width)
 //   .attr('height', height)
 //   .call(d3.zoom().on("zoom", function () {
 //     svg.attr("transform", d3.event.transform);
 //   }))
 //   .append("g");


 //   const nodes = data.nodes.map(node => ({
 //     ...node,
 //     shape: getShape(node.search_term)
 //   }));


 //   const colorScale = d3.scaleOrdinal(d3.schemeCategory10)
 //     .domain([...new Set(data.nodes.map(node => node.search_term))]);

 //     addLegend(svg, colorScale);
 //   const simulation = d3.forceSimulation(data.nodes)
 //     .force('link', d3.forceLink(data.edges).id(d => d.id))
 //     .force('charge', d3.forceManyBody())
 //     .force('center', d3.forceCenter(width / 2, height / 2));

 //   const link = svg.append('g')
 //     .attr('class', 'links')
 //     .selectAll('line')
 //     .data(data.edges)
 //     .enter()
 //     .append('line')
 //     .style("stroke", "#aaa")


 //   const node = svg.append('g')
 //     .attr('class', 'nodes')
 //     .selectAll('circle')
 //     .data(data.nodes)
 //     .enter()


 //     .append('circle')
 //     .attr('r', nodeRadius)
 //     .attr('fill', d => colorScale(d.search_term))



 //   simulation.on('tick', () => {
 //     link
 //       .attr('x1', d => d.source.x)
 //       .attr('y1', d => d.source.y)
 //       .attr('x2', d => d.target.x)
 //       .attr('y2', d => d.target.y);

 //     node
 //       .attr('cx', d => d.x)
 //       .attr('cy', d => d.y);
 //   });





 // };



 const NetworkGraph = async (e) => {
  let data = e;
  const margin = { top: 20, right: 20, bottom: 20, left: 20 };
  const nodeRadius = 5;

  const numNodes = data.nodes.length;
  const width = Math.max(400, Math.min(2000, numNodes * 2 * nodeRadius)) + margin.left + margin.right;
  const height = Math.max(400, Math.min(1000, numNodes * 2 * nodeRadius)) + margin.top + margin.bottom;

  d3.select('#network-graph-container').selectAll("*").remove();
  const svg = d3.select('#network-graph-container')
   .append('svg')
   .attr('width', width)
   .attr('height', height)
   .call(d3.zoom().on("zoom", function () {
    svg.attr("transform", d3.event.transform);
   }))
   .append("g");


  //   data.nodes = data.nodes.map(node => ({
  //   ...node,
  //   shape: getShape(node.search_term)
  // }));


  const colorScale = d3.scaleOrdinal(d3.schemeCategory10)
   .domain([...new Set(data.nodes.map(node => node.search_term))]);

  addLegend(svg, colorScale);
  const simulation = d3.forceSimulation(data.nodes)
   .force('link', d3.forceLink(data.edges).id(d => d.id))
   .force('charge', d3.forceManyBody())
   .force('center', d3.forceCenter(width / 2, height / 2));



  const link = svg.append('g')
   .attr('class', 'links')
   .selectAll('line')
   .data(data.edges)
   .enter()
   .append('line')
   .style("stroke", "#aaa");


  const node = svg.append('g')
   .attr('class', 'nodes')
   .selectAll('circle')
   .data(data.nodes)
   .enter()
   .append('circle')
   .attr('r', nodeRadius)
   .attr('fill', d => colorScale(d.search_term))
  // .call(d3.drag() // Enable dragging for nodes
  // .on("start", dragstarted)
  // .on("drag", dragged)
  // .on("end", dragended));

  // function dragstarted() {
  //     d3.fx = d3.x;
  //     d3.fy = d3.y;
  //   }

  //   function dragged(event) {
  //     d3.fx = event.x;
  //     d3.fy = event.y;
  //   }

  //   function dragended(event) {
  //     if (!event.active) simulation.alphaTarget(0);
  //     d3.fx = null;
  //     d3.fy = null;
  //   }

  simulation.on('tick', () => {
   link
    .attr('x1', d => d.source.x)
    .attr('y1', d => d.source.y)
    .attr('x2', d => d.target.x)
    .attr('y2', d => d.target.y);

   node
    .attr('transform', d => `translate(${d.x},${d.y})`); // Update node positions
  });


 };
 const NetworkGraphSharechart = async (e) => {
  let data = e;
  const margin = { top: 20, right: 20, bottom: 20, left: 20 };
  const nodeRadius = 5;

  const numNodes = data.nodes.length;
  const width = Math.max(400, Math.min(2000, numNodes * 2 * nodeRadius)) + margin.left + margin.right;
  const height = Math.max(400, Math.min(1000, numNodes * 2 * nodeRadius)) + margin.top + margin.bottom;

  d3.select('#network-graph-container').selectAll("*").remove();
  const svg = d3.select('#network-graph-container')
   .append('svg')
   .attr('width', width)
   .attr('height', height)
   .call(d3.zoom().on("zoom", function () {
    svg.attr("transform", d3.event.transform);
   }))
   .append("g");


  //   data.nodes = data.nodes.map(node => ({
  //   ...node,
  //   shape: getShape(node.search_term)
  // }));


  const colorScale = d3.scaleOrdinal(d3.schemeCategory10)
   .domain([...new Set(data.nodes.map(node => node.search_term))]);

  addLegend(svg, colorScale);
  const simulation = d3.forceSimulation(data.nodes)
   .force('link', d3.forceLink(data.edges).id(d => d.id))
   .force('charge', d3.forceManyBody())
   .force('center', d3.forceCenter(width / 2, height / 2));



  const link = svg.append('g')
   .attr('class', 'links')
   .selectAll('line')
   .data(data.edges)
   .enter()
   .append('line')
   .style("stroke", "#aaa");


  const node = svg.append('g')
   .attr('class', 'nodes')
   .selectAll('circle')
   .data(data.nodes)
   .enter()
   .append('circle')
   .attr('r', nodeRadius)
   .attr('fill', d => colorScale(d.search_term))
  // .call(d3.drag() // Enable dragging for nodes
  // .on("start", dragstarted)
  // .on("drag", dragged)
  // .on("end", dragended));

  // function dragstarted() {
  //     d3.fx = d3.x;
  //     d3.fy = d3.y;
  //   }

  //   function dragged(event) {
  //     d3.fx = event.x;
  //     d3.fy = event.y;
  //   }

  //   function dragended(event) {
  //     if (!event.active) simulation.alphaTarget(0);
  //     d3.fx = null;
  //     d3.fy = null;
  //   }

  simulation.on('tick', () => {
   link
    .attr('x1', d => d.source.x)
    .attr('y1', d => d.source.y)
    .attr('x2', d => d.target.x)
    .attr('y2', d => d.target.y);

   node
    .attr('transform', d => `translate(${d.x},${d.y})`); // Update node positions
  });


 };

 function dragstarted(event, d) {
  d3.select(this).attr("cx", event.x).attr("cy", event.y);
 }

 // function dragged(event, d) {
 //   // console.log("d",d)
 //   // console.log("event",event)
 //   // d3.select(this).attr("cx", d.x = event.x).attr("cy", d.y = event.y);
 //   d.fx = event.x; // Fix the x-coordinate
 //   d.fy = event.y; // Fix the y-coordinate
 // }

 function dragged(event, d) {
  // Calculate the new position of the node based on the drag event
  // Since d is a number, you might need to find the node in the data array
  // based on its index or ID, and then update its position
  const index = d; // Assuming d is the index of the node in the data array
  const node = data.nodes[index]; // Retrieve the node object from the data array
  // Update the position of the node
  node.x = event.x;
  node.y = event.y;

  // Update the visual position of the node
  d3.select(this)
   .attr("cx", event.x)
   .attr("cy", event.y);

  // Update the simulation
  simulation.nodes(data.nodes);
  simulation.alpha(0.3).restart(); // Restart the simulation with a low alpha value
 }


 function dragended(event, d) {
  d.fx = null; // Release the x-coordinate
  d.fy = null; // Release the y-coordinate
 }



 const addLegend = (svg, colorScale) => {
  // Define the legend
  const legend = svg.append("g")
   .attr("class", "legend")
   .attr("transform", "translate(20,20)");

  // Add legend color rectangles
  const legendRects = legend.selectAll("rect")
   .data([...new Set(colorScale.domain())])
   .enter()
   .append("rect")
   .attr("x", 0)
   .attr("y", (d, i) => i * 20)
   .attr("width", 10)
   .attr("height", 10)
   .attr("fill", colorScale);

  // Add legend labels
  const legendTexts = legend.selectAll("text")
   .data([...new Set(colorScale.domain())])
   .enter()
   .append("text")
   .attr("x", 20)
   .attr("y", (d, i) => i * 20 + 10)
   .text(d => d);
 };







 const images = [
  "https://images.unsplash.com/photo-1509721434272-b79147e0e708?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80",
 ];
 const citationStyle = {
  fontFamily: 'Arial, sans-serif',
  fontSize: '14px',
  lineHeight: '1.6',
 };

 const listItemStyle = {
  marginLeft: '20px',
 };


 function convertDate(inputFormat) {
  function pad(s) { return (s < 10) ? '0' + s : s; }
  var d = new Date(inputFormat)
  return [pad(d.getDate()), pad(d.getMonth() + 1), d.getFullYear()].join('/')
 }

 const downloadImages = (urls) => {
  urls.forEach(async (url, index) => {
   try {
    // Fetch the image as a blob
    const response = await fetch(url);
    if (!response.ok) {
     throw new Error(`Failed to fetch image: ${url}`);
    }
    const blob = await response.blob();

    // Create a temporary object URL for the blob
    const objectUrl = URL.createObjectURL(blob);

    // Create a link element for downloading
    const link = document.createElement('a');
    link.href = objectUrl;

    // Extract file name from URL or create a default name
    const fileName = url.split('/').pop() || `graph_${index + 1}.png`;
    link.download = fileName;

    // Trigger download
    document.body.appendChild(link);
    link.click();

    // Clean up
    document.body.removeChild(link);
    URL.revokeObjectURL(objectUrl); // Revoke the object URL to free memory
   } catch (error) {
    console.error(`Error downloading image: ${url}`, error);
   }
  });
 };

 const handleSubmit = async () => {
  let selectedValues = []

  if (coomunityoption == 'Quora') {
   // ########### previous ->
   // selectedValues = selectedOption.map(option => option.value.toLowerCase());
   // console.log(selectedValues);
   // // Fetch and render the graph
   // console.log()
   // await fetchGraphData(selectedValues);

   if (!CommunityDetectionDate) {
    alert('Please select at least one keyword');
   }
   else {
    console.log(CommunityDetectionDate)
    const img1 = `${url}comgraphsq/rseed_123456_${CommunityDetectionDate}.png`
    const img2 = `${url}comgraphsvgq/rseed_123456_${CommunityDetectionDate}.svg`

    console.log("img1", img1)
    console.log("img2", img2)
    setImageUrls([img1, img2]);
   }

  } 
  // ########### share chat
  else {
   if (kValue && randomSeed && samplingStrategy) {

    let strategy = samplingStrategy;
    if (strategy === 'snowball') { 
      strategy = 'snowball2';
    }

    const img1 = `${url}comgraphssc/Gender_rseed_${randomSeed}_K_${kValue}_style_${strategy}.png`
    const img2 = `${url}comgraphssc/Keywords_rseed_${randomSeed}_K_${kValue}_style_${strategy}.png`
    const img3 = `${url}comgraphsvgsc/Gender_rseed_${randomSeed}_K_${kValue}_style_${strategy}.svg`
    const img4 = `${url}comgraphsvgsc/Keywords_rseed_${randomSeed}_K_${kValue}_style_${strategy}.svg`

    setImageUrls([img1, img2, img3, img4]);
   } else {
    alert('Please select all parameters (K-Value, Random Seed, Sampling Strategy)');
   }
  }

 };
 const getNodeData = (node, key) => {
  const data = node.data;

  // If there's only one <data> tag, xml2js gives an object not array
  const dataArray = Array.isArray(data) ? data : [data];

  const dataElement = dataArray.find(data => data._attributes.key === key);
  return dataElement ? dataElement._text : null;
 };


 const fetchGraphData = async (selectedValues) => {
  if (coomunityoption == 'Quora') {
   try {
    let formData = new FormData()
    let a = convertDate(CommunityDetectionDate)
    // formData.append("website",coomunityoption)
    console.log("Date", convertDate(CommunityDetectionDate))
    formData.append("date", convertDate(CommunityDetectionDate))
    console.log("formData", JSON.stringify({ "date": a, "website": coomunityoption }))
    let header = {
     headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
     },

     method: "POST",
     body: JSON.stringify({ "date": a, "website": coomunityoption })
     // JSON.stringify({"hello":123,"website":formData,"Date":convertDate(CommunityDetectionDate)})
    }

    const response = await fetch(url + 'graph/politicaldata/' + coomunityoption, header);
    if (!response.ok) {
     throw new Error('Failed to fetch GraphML data');
    }
    let text = await response.text();
    text = text.toLowerCase();
    console.log("text", text);

    // Parse GraphML data
    const parsedData = parseGraphML(text, selectedValues);
    if (!parsedData) {
     throw new Error('Failed to parse GraphML data');
    }
    console.log('parsedData', parsedData)
    // setGraphData(parsedData);
    // Render the graph
    // renderGraph(parsedData);
    NetworkGraph(parsedData)
    //     const elements = {
    //   nodes: parsedData.nodes,
    //   edges: parsedData.edges
    // };

    // setgraphdata(elements)
   } catch (error) {
    console.error('Error fetching or parsing GraphML data:', error);
   }
  }

  else {
   try {
    let formData = new FormData()
    formData.append("website", coomunityoption)
    let header = {


     method: "POST",
     body: JSON.stringify({ "hello": 123, "website": formData })
    }
    const response = await fetch(url + 'graph/politicaldata/' + coomunityoption, header);
    if (!response.ok) {
     throw new Error('Failed to fetch GraphML data');
    }
    const text = await response.text();
    // Parse GraphML data
    console.log("text", text)
    const parsedData = parseGraphMLShare(text, selectedValues);
    if (!parsedData) {
     throw new Error('Failed to parse GraphML data');
    }
    console.log('parsedData', parsedData)
    // setGraphData(parsedData);
    // Render the graph
    // renderGraph(parsedData);
    NetworkGraphSharechart(parsedData)
    //     const elements = {
    //   nodes: parsedData.nodes,
    //   edges: parsedData.edges
    // };

    // setgraphdata(elements)
   } catch (error) {
    console.error('Error fetching or parsing GraphML data:', error);
   }
  }
 };

 // const parseGraphML = (text) => {
 //   try {
 //     // Parse the XML string into a JavaScript object using xml-js library
 //     const xmlObject = xml2js(text, { compact: true });

 //     // const xmlObject = XMLParser(text, { compact: true });

 //     // Extract necessary data from the parsed XML object
 //     const graphData = xmlObject.graphml.graph;

 //     // Assuming you need to extract nodes and edges data
 //     const nodes = graphData.node;
 //     const edges = graphData.edge;

 //     // Return an object containing nodes and edges
 //     console.log({ nodes, edges })
 //     return { nodes, edges };
 //   } catch (error) {
 //     console.error('Error parsing GraphML data:', error);
 //     return null; // Return null in case of parsing failure
 //   }
 // };
 const getEdgeData = (edge, key) => {
  const dataElement = edge.data.find(data => data._attributes.key === key);
  return dataElement ? dataElement._text : null;
 };
 // const parseGraphML = (text, selectedValues) => {
 //   try {
 //     // Parse the XML string into a JavaScript object using xml-js library
 //     // console.log()
 //     const xmlObject = xml2js(text, { compact: true });
 //     const graphData = xmlObject.graphml.graph;


 //     if (!graphData) {
 //       throw new Error('Graph data not found in the XML');
 //     }

 //     const nodes = graphData.node
 //   .map(node => ({
 //     id: node._attributes.id,
 //     search_term: getNodeData(node, 'd1'), 
 //     location: getNodeData(node, 'd0') 
 //   }))
 //   .filter(node => {
 //     return selectedValues.includes(node.search_term);
 //   });
 //     const filteredNodeIds = nodes.map(node => node.id);


 //     const edges = graphData.edge
 //   .filter(edge => edge._attributes.source && edge._attributes.target)
 //    .filter(edge => {
 //       return filteredNodeIds.includes(edge._attributes.source) && filteredNodeIds.includes(edge._attributes.target);
 //     }) 
 //   .map((edge, index) => ({
 //     id: `edge-${index}`, 
 //     source: edge._attributes.source,
 //     target: edge._attributes.target,
 //     label: getEdgeData(edge, 'd3'), 
 //     weight: getEdgeData(edge, 'd2') 
 //   }));
 //     console.log('abc', { nodes, edges })
 //     console.log('edges',edges)
 //     return { nodes, edges };
 //   } catch (error) {
 //     console.error('Error parsing GraphML data:', error);
 //     return null; 
 //   }
 // };
 const getEdgeDataShare = (edge, key) => {
  if (!Array.isArray(edge.data)) {
   // Handle the case where edge.data is not an array
   return null;
  }

  const dataElement = edge.data.find(data => data._attributes.key === key);
  return dataElement ? dataElement._text : null;
 };
 const parseGraphML = (text, selectedValues) => {
  try {
   const xmlObject = xml2js(text, { compact: true });
   const graphData = xmlObject.graphml.graph;

   if (!graphData) {
    throw new Error('Graph data not found in the XML');
   }

   const nodes = graphData.node
    .map(node => ({
     id: node._attributes.id,
     search_term: getNodeData(node, 'd1'),
     location: getNodeData(node, 'd0')
    }))
    .filter(node => selectedValues.includes(node.search_term));

   const filteredNodeIds = nodes.map(node => node.id);

   const edges = graphData.edge
    .filter(edge => edge._attributes.source && edge._attributes.target)
    .filter(edge => {
     return filteredNodeIds.includes(edge._attributes.source) && filteredNodeIds.includes(edge._attributes.target);
    })
    .map((edge, index) => ({
     id: `edge-${index}`,
     source: edge._attributes.source,
     target: edge._attributes.target,
     label: getEdgeData(edge, 'd3'),
     weight: getEdgeData(edge, 'd2')
    }));

   // const colorScale = d3.scaleOrdinal(d3.schemeCategory10)
   //     .domain([...new Set(nodes.map(node => node.search_term))]);

   // nodes.forEach(node => {
   //     node.color = colorScale(node.search_term);
   // });

   return { nodes, edges };
  } catch (error) {
   console.error('Error parsing GraphML data:', error);
   return null;
  }
 };

 const parseGraphMLShare = (text, selectedValues) => {
  try {
   const xmlObject = xml2js(text, { compact: true });
   console.log(xmlObject)
   const graphData = xmlObject.graphml.graph;
   console.log("graphData", graphData)
   if (!graphData) {
    throw new Error('Graph data not found in the XML');
   }

   let nodes = graphData.node
    .map(node => ({
     id: node._attributes.id,
     search_term: getNodeData(node, 'd0')
     // location: getNodeData(node, 'd1') 
    }))

   console.log("node,", nodes)
   nodes = nodes.filter(node => selectedValues.includes(node.search_term));
   console.log("node1,", nodes)
   const filteredNodeIds = nodes.map(node => node.id);
   console.log("graphData.edge", graphData.edge)
   const edges = graphData.edge
    .filter(edge => edge._attributes.source && edge._attributes.target)
    .filter(edge => {
     return filteredNodeIds.includes(edge._attributes.source) && filteredNodeIds.includes(edge._attributes.target);
    })
    .map((edge, index) => ({
     id: `edge-${index}`,
     source: edge._attributes.source,
     target: edge._attributes.target
     // label: getEdgeDataShare(edge, 'd3'),
     // weight: getEdgeDataShare(edge, 'd2')
    }));

   // const colorScale = d3.scaleOrdinal(d3.schemeCategory10)
   //     .domain([...new Set(nodes.map(node => node.search_term))]);

   // nodes.forEach(node => {
   //     node.color = colorScale(node.search_term);
   // });
   console.log("edges", edges)
   return { nodes, edges };
  } catch (error) {
   console.error('Error parsing GraphML data:', error);
   return null;
  }
 };

 const changecomm = (checkbox_status_a, Comm_keywords_a, m) => {
  d3.select('#network-graph-container').selectAll("*").remove();
  setcheckbox_status(checkbox_status_a)
  setComm_keywords(Comm_keywords_a)
  setComm_selected(Comm_keywords_a)
  setCommunityOption(m)
  setSelectedOption([])
 }
 const renderGraph = (data) => {
  console.log('data', data)
  if (!data || (!data.nodes && !data.edges)) {
   console.error('Invalid graph data:', data);
   return;
  }

  const elements = {
   nodes: data.nodes,
   edges: data.edges
  };

  console.log('elements', elements)
  let edges = elements.edges
  for (let j = 0; j < edges.length; j++) {
   if (!edges[j].source || !edges[j].target) {
    console.log("j", edges[j])
   }
  }
  const cy = cytoscape({
   container: document.getElementById('cy'),
   elements: elements,
   layout: { name: 'cose' }
  });

  if (!cy) {
   console.error('Failed to initialize Cytoscape');
   return;
  }

  setCy(cy);
 };



 return (<>
  <Top />
  {/* <Header/> */}
  <Tabs
   defaultActiveKey="home"
   id="uncontrolled-tab-example"
   className="mb-3"
  >
   <Tab eventKey="home" title="Home">



    <br />


    <Container>
     <Row>
      <Col xs={8}>
       <Row>
        <Col>


         <h4>Fake news</h4>

         In the era of digital communication, the spread of fake news has become a significant concern. Traditional methods of fake news detection primarily rely on text-based analysis. However, this project aims to enhance the detection accuracy by incorporating multimodal data, including both text and images.  The proposed pipeline comprises two main components: the transformer module and the scene graph module. For each modality, a scene graph is created and used as auxiliary data inputted into the transformer module. The text and images are processed by two separate transformers, extracting features that are then combined with the features learned from the scene graph to perform classification.
        </Col>
       </Row>
       <Row>
        <Col>
         <br />   <h4>Framing</h4>
         The news framing project aims at classifying Indian news headlines from multiple sources into frames such as conflict, game etc. When covering elections, these frames shape how the public perceives electoral issues and events. This study examines how news frames, especially conflict and game frames, were employed by news organizations in India to cover the 2014 and 2019 general elections. We analyzed how the frames varied temporally, by region, and by the party being featured in the articles.        </Col>
       </Row>
       <Row>
        <Col>
         <br />  <h4>Political Ads</h4>
         The project aims to computationally analyze and find Election Code of Conduct violations by parties and participants. We primarily look at two types of violations: When the participant underreports his expenditure in the official affidavit and spends more on social media ads and silent period violations when parties are not supposed to advertise two days before since it is illegal to do so. We primarily use Facebook Ads data and filter people based on exact name matches and timelines and then crosscheck the calculated ad expenditure with what was declared. A similar approach is used to identify the parties for Silent period violations.
        </Col>
       </Row>
       <Row>
        <Col>
         <br /> <h4>Toxic Memes</h4>
         Our project, focused on developing an efficient AI model for detecting toxic content in images, integrates advanced technologies in a novel pipeline designed for platforms with limited computational power. Key components include image cleaning, OCR, and the use of InstructBlip for detailed captions, complemented by visual and text-based scene graphs. The integration of insights through models like BLIP with FLAN T5 marks a significant step in our methodology. However, as the project progresses, the selection of models, such as FLAN T5, may evolve based on emerging technologies and findings, ensuring our approach remains at the forefront of innovation in AI-driven content moderation.        </Col>
       </Row>
       <Row>
        <Col>
         <br /><h4>Community Detection</h4>
         The project aims to comprehensively identify and analyze political geo-influencers within the diverse landscape of India, with a specific focus on detecting the online communities they impact. Leveraging advanced data extraction techniques, we seek to uncover temporal patterns to discern the dynamic growth and contraction of these communities, particularly as elections approach. Additionally, our research delves into the nuanced shifts in online sentiment surrounding these communities and influencers, providing valuable insights into evolving public perceptions. Furthermore, by harnessing geolocation data, we aim to conduct a granular examination of how political communities and their associated sentiments evolve across various regions of the country, offering a multifaceted understanding of the socio-political fabric at a local level. Through this multidimensional approach, our project endeavors to contribute to a deeper comprehension of the intricate interplay between digital discourse, political influence, and geographic dynamics within the Indian context.        </Col>
       </Row>
      </Col>
      <Col>
       {/* Nested Rows in the Second Column */}
       <Row><Col>
        <div style={{ textAlign: 'center', border: '1px solid #333', borderRadius: '10px', padding: '10px', backgroundColor: '#f0f0f0' }}>
         <h1 style={{ fontSize: '22px', color: '#333', margin: '0' }}>Visitor's Count: {visitorCount}</h1>
        </div><br />
       </Col></Row>
       <Row>
        <Col>

         <Accordion>
          <Accordion.Item eventKey="0">
           <Accordion.Header>Moral Code of Conduct 12/07/2024</Accordion.Header>
           <Accordion.Body>
            This document outlines the ethical standards and guidelines to be followed by all stakeholders involved in the electoral process.
           </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="1">
           <Accordion.Header>First Phase of Elections 01/07/2024</Accordion.Header>
           <Accordion.Body>
            This marks the commencement of the first phase of the electoral process, where eligible voters cast their votes to elect their representatives.
           </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="2">
           <Accordion.Header>Second Phase of Elections 08/07/2024</Accordion.Header>
           <Accordion.Body>
            The second phase of elections continues the democratic process, allowing citizens to exercise their right to vote and participate in shaping their governance.
           </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="3">
           <Accordion.Header>Vote Count 12/07/2024</Accordion.Header>
           <Accordion.Body>
            This stage involves the tallying and verification of votes cast during the election to determine the outcome and winners of the electoral contests.
           </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="4">
           <Accordion.Header>Swearing-In Ceremony 30/07/2024</Accordion.Header>
           <Accordion.Body>
            The swearing-in ceremony marks the formal induction of the elected candidates into their respective offices, symbolizing the beginning of their term.
           </Accordion.Body>
          </Accordion.Item>
         </Accordion>

        </Col>
       </Row>
       <Row>
        <Col>
         <br />
         <Timeline
          dataSource={{
           sourceType: 'profile',
           screenName: 'ECISVEEP',
           // 'Election Commission of India',
           // url:'https://twitter.com/ECISVEEP?ref_src=twsrc%5Etfw%7Ctwcamp%5Eembeddedtimeline%7Ctwterm%5Escreen-name%3AECISVEEP%7Ctwcon%5Es1_c1'
          }}
          options={{
           height: '450',
          }}
         />
        </Col>
       </Row>
      </Col>
     </Row>
     <Row></Row>
     <Row>
      <br /><br /> <h4>Tools Used</h4><br />
      {/* <a href="https://pytorch.org"/> */}
      {/* <Col xs={6} md={4}>
<Image src="https://pytorch.org/assets/images/logo.svg" fluid  />

</Col> */}
      <Col>
       <Figure>
        <Figure.Image
         width={75}
         height={50}
         // alt="171x180"
         src="https://pytorch.org/assets/images/logo.svg" />
        <Figure.Caption>
         PyTorch
        </Figure.Caption>
       </Figure>
       <Figure>
        <Figure.Image
         width={25}
         height={50}
         // alt="171x180"
         src={url + "static/Grafana.png"}
        />
        <Figure.Caption>
         Grafana
        </Figure.Caption>
       </Figure></Col>


     </Row>
     <Row>
      <Col></Col>
      <Col>
       <Citation /></Col><Col></Col>
     </Row>
    </Container>


   </Tab>
   <Tab eventKey="profile" title="Fake News">

    <Container>
     <Row><Col>
      <Row className="justify-content-center">
       <h4 className="text-center mb-4">Fake News Model</h4>
      </Row>
      {/* </Col> */}
      <Form onSubmit={(e) => SubmitFakeNews(e)}>
       <Form.Group className="mb-3" controlId="FakeNews.News">

        <Form.Label>Upload Image</Form.Label>
        <Form.Control required type="file" onChange={(e) => { setFakenewsurl(e.target.files[0]) }} /> <br />
        <Form.Label>Enter Text to check content</Form.Label>
        <Form.Control required as="textarea" rows={5} onChange={(e) => { setFakenews(e.target.value) }} />

        <br />
        <Form.Label>Enter Email</Form.Label>
        <Form.Control required as="textarea" rows={1} onChange={(e) => { setfakenewsemail(e.target.value) }} />
       </Form.Group>




       <Button variant="primary" type='submit'>Submit</Button>
       <br /></Form><br />
      {fakenesres.length > 0 &&
       <div style={{ border: '2px solid #ccc', padding: '10px', borderRadius: '5px', width: '100%' }}>

        <p>Please read the readme.md file to get instructions on how to use inference scripts.</p>
        {/* <p><strong>Explanation is:</strong> {memsres}</p> */}
       </div>
      }
      <Row>
       {/* {fakenesres.length>0 &&  "News is " +fakenesres}  */}
      </Row></Col>
      <Col> <Container>
       <Row className="justify-content-center">
        <h4 className="text-center mb-4">Architecture</h4>
       </Row>
       <Row style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
        <Figure.Image
         style={{ width: '150%', maxWidth: '100%', height: '360px', objectFit: 'contain' }}
         alt="Banner Image"
         src={url + "static/FakenewsUpdated.png"}
        />
       </Row>
      </Container></Col>
     </Row>



    </Container>
    <Container>
     {/* <ClassificationReportHeatmap /> */}
     <br>
     </br>
     <br>
     </br>
     <ClassificationReportBarplot />

    </Container>
   </Tab>


   <Tab eventKey="Framing" title="Framing">




    <Container>


     <Row ><Col>
      <Row className="justify-content-center">
       <h4 className="text-center mb-4">Framing Model</h4>
      </Row>

      <Form onSubmit={(e) => SubmitFraming(e)}>
       <Form.Group className="mb-3" controlId="Framing.text">
        {/* // SubmitFraming */}
        <Form.Label>Enter the article</Form.Label>

        <Form.Control required as="textarea" rows={1} cols={5} onChange={(e) => { setFramingUrl(e.target.value) }} />

        {/* <Form.Label>Enter Text to check content</Form.Label> */}
        {/* <Form.Control required  as="textarea" rows={5} onChange={(e)=>{setFramingtext(e.target.value)}} /><br/> */}
       </Form.Group>


       <Button variant="primary" type="submit" >   Submit  </Button>

      </Form><br />
      {framingres.length > 0 &&
       <div style={{ border: '2px solid #ccc', padding: '10px', borderRadius: '5px', width: '100%' }}>

        <p>Please read the readme.md file to get instructions on how to use inference scripts.</p>
        {/* <p><strong>Explanation is:</strong> {memsres}</p> */}
       </div>
      }</Col>
      <Col> <Container>
       <Row className="justify-content-center">
        <h4 className="text-center mb-4">Architecture</h4>
       </Row>
       <Row style={{ display: 'flex', justifyContent: 'center', marginTop: '10px' }}>
        <Figure.Image
         style={{ width: '150%', maxWidth: '100%', height: '300px', objectFit: 'contain' }}
         alt="Banner Image"
         src={url + "static/Framing.png"}
        />
       </Row>
      </Container></Col>

     </Row>
     <Row>

      {/* {framingres.length>0 &&  "FRAME IS " +framingres} */}

     </Row>
     <Row>
      <Col>
       <br />

      </Col> <Col>

      </Col>
     </Row>
    </Container>
    <Frameg />

   </Tab>
  {/* ######################################################################################### */}
                  {/* Community Detection */}
  {/* ############################################################################################# */}
     <Tab eventKey="Com_Dot" title="Community Detection">
    <Container>
     <Row>
      <Col>
       <Row>
      <h4 className="text-center mb-4">Community Detection Model</h4>
       </Row>

       <div key={`reverse-radio`} className="mb-3">
      <Form.Check
       inline
       reverse
       label="Quora"
       name="group1"
       type="radio"
       id={`reverse-radio-1`}
       onClick={() => {
        setCommunityOption("Quora");
        changecomm(checkbox_status_quora, Comm_keywords_quora, "Quora");
       }}
      />
      <Form.Check
       inline
       reverse
       label="Sharechat"
       name="group1"
       type="radio"
       id={`reverse-radio-2`}
       onClick={() => {
        setCommunityOption("Sharechat");
        changecomm(checkbox_status_sharechat, Comm_keywords_sharechat, "Sharechat");
       }}
      />
       </div>

      {coomunityoption === "Quora" && (
       <>
        <Form.Group className="mb-3">
         <Form.Label>Select Date</Form.Label>
         <Form.Select
         value={CommunityDetectionDate || ""}
         onChange={e => setCommunityDetectionDate(e.target.value)}
         required
         >
         <option value="">Select a date</option>
         <option value="03-06-2024">03-06-2024</option>
         <option value="05-06-2024">05-06-2024</option>
         <option value="06-06-2024">06-06-2024</option>
         <option value="07-06-2024">07-06-2024</option>
         <option value="08-06-2024">08-06-2024</option>
         <option value="09-06-2024">09-06-2024</option>
         <option value="10-05-2024">10-05-2024</option>
         <option value="11-05-2024">11-05-2024</option>
         <option value="11-06-2024">11-06-2024</option>
         <option value="12-05-2025">12-05-2025</option>
         <option value="12-06-2024">12-06-2024</option>
         <option value="13-05-2024">13-05-2024</option>
         <option value="13-06-2024">13-06-2024</option>
         <option value="14-05-2024">14-05-2024</option>
         <option value="15-05-2024">15-05-2024</option>
         <option value="16-05-2024">16-05-2024</option>
         <option value="17-05-2024">17-05-2024</option>
         </Form.Select>
        </Form.Group>
       </>
      )}
       <br />

       {/* Sharechat Section */}
       {coomunityoption === "Sharechat" && (
      <>
       <Form.Group className="mb-3">
        <Form.Label>K-Value</Form.Label>
        <Form.Select onChange={(e) => setKValue(parseInt(e.target.value))}>
         <option value="">Select K</option>
         {[1000, 5000, 10000, 20000].map((val) => (
        <option key={val} value={val}>{val}</option>
         ))}
        </Form.Select>
       </Form.Group>

       <Form.Group className="mb-3">
        <Form.Label>Random Seed</Form.Label>
        <Form.Select onChange={(e) => setRandomSeed(parseInt(e.target.value))}>
         <option value="">Select Seed</option>
         {[123456, 246912, 740736, 2962944, 14814720, 88888320, 622218240, 4977745920, 44799713280, 447997132800].map((val) => (
        <option key={val} value={val}>{val}</option>
         ))}
        </Form.Select>
       </Form.Group>

       <Form.Group className="mb-3">
        <Form.Label>Sampling Strategy</Form.Label>
        <Form.Select onChange={(e) => setSamplingStrategy(e.target.value)}>
         <option value="">Select Strategy</option>
         {["grab", "snowball"].map((val) => (
        <option key={val} value={val}>{val}</option>
         ))}
        </Form.Select>
       </Form.Group>
      </>
       )}

       {/* Show image for sampling strategy */}
       {coomunityoption === "Sharechat" && samplingStrategy === "snowball" && (
      <div style={{ marginBottom: '16px', textAlign: 'center' }}>
       <img
        src="/img/snowball.jpg"
        alt="Snowball Sampling"
        style={{ maxWidth: '100%', height: '200px', objectFit: 'contain', border: '1px solid #ccc', borderRadius: '8px' }}
       />
       <div style={{ fontSize: '14px', color: '#555' }}>Snowball Sampling</div>
      </div>
       )}
       {coomunityoption === "Sharechat" && samplingStrategy === "grab" && (
      <div style={{ marginBottom: '16px', textAlign: 'center' }}>
       <img
        src={`http://localhost:3500/static/grab.gif`}
        alt="Grab Sampling"
        style={{ maxWidth: '100%', height: '200px', objectFit: 'contain', border: '1px solid #ccc', borderRadius: '8px' }}
       />
       <div style={{ fontSize: '14px', color: '#555' }}>Grab Sampling</div>
      </div>
       )}

       <div className="d-flex gap-2">
      <Button variant="primary" onClick={handleSubmit}>Submit</Button>

      {imageUrls.length > 0 && (
       <Button
        variant="success"
        onClick={() => downloadImages(imageUrls)}
       >Download Graphs</Button>
      )}
       </div>
      </Col>

      <Col>
       <Container>
      <Row className="justify-content-center">
       <h4 className="text-center mb-4">Sample Graph</h4>
      </Row>
      <Row style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
       <Figure.Image
        style={{ width: '150%', maxWidth: '100%', height: '300px', objectFit: 'contain' }}
        alt="Banner Image"
        src={url + "static/CommunityDetection.png"}
       />
      </Row>
       </Container>
      </Col>
     </Row>

     <Row><br /><br /></Row>

     <Row>
      <Col>
       <div style={{ maxHeight: '600px', overflowY: 'auto' }}>
      <div id="network-graph-container"></div>
       </div>
      </Col>
     </Row>

     {imageUrls.length == 4 && (
      <Row className="mt-4">
       <h4 className="text-center mb-3">Generated Graphs</h4>
       {imageUrls.slice(0, 2).map((src, idx) => (
      <Col key={idx} xs={12} md={6} className="mb-4">
       <Figure className="text-center">
        <MagnifierImage
    src={src}
    alt={`Graph ${idx + 1}`}
    style={{ width: '100%', height: 'auto', maxHeight: '500px', objectFit: 'contain' }}
    magnifierHeight={150}
    magnifierWidth={150}
    zoom={2}
  />
        <Figure.Caption className="mt-2 fs-5">Graph {idx + 1}</Figure.Caption>
       </Figure>
      </Col>
       ))}
      </Row>
     )}

     {imageUrls.length == 2 && (
      <Row className="mt-4">
       <h4 className="text-center mb-3">Generated Graphs</h4>
       {imageUrls.slice(0, 1).map((src, idx) => (
      <Col key={idx} xs={12} md={6} className="mb-4">
       <Figure className="text-center">
        <MagnifierImage
    src={src}
    alt={`Graph ${idx + 1}`}
    style={{ width: '100%', height: 'auto', maxHeight: '500px', objectFit: 'contain' }}
    magnifierHeight={150}
    magnifierWidth={150}
    zoom={2}
  />
        <Figure.Caption className="mt-2 fs-5">Graph {idx + 1}</Figure.Caption>
       </Figure>
      </Col>
       ))}
      </Row>
     )}
     
    </Container>
     </Tab>




     <Tab eventKey="Poltical Ads" title="Poltical Ads">

    <Container>
     <Row>
      <Col >
       <Row className="justify-content-center">
      <h4 className="text-center mb-4"><br></br><br></br><br></br><br></br><br></br>Poltical Ads</h4>
       </Row>


       {/* <Form onSubmit={(e)=>polticalads(e)}>
        <Form.Group className="mb-3" controlId="Ads.text">
          <Form.Label>Enter Poltical Party Name </Form.Label>
          <Form.Control as="textarea" rows={1} onChange={(e)=>{setAds(e.target.value)}} />
          </Form.Group>

         <Button variant="primary" type='submit'>
          Submit
          </Button>


        </Form> */}
       {/* <iframe
        src={url+"grapdads/table.html"}
        title="Plotly Plot"
        width="100%"
        height="700px"
        frameBorder="0"
      /> */}
       <br />
       {adsres.length > 0 && adsres.map(item => (
        <img
         key={item.key}
         src={item.url}
         alt={`Image ${item.key}`}
         style={{ maxWidth: '70%', height: 'auto', margin: '10px', marginTop: '5px' }}
        />
       ))}</Col>
      <Col> <Container>
       <Row className="justify-content-center">
        <h4 className="text-center mb-4">Logo</h4>
       </Row>
       <Row style={{ display: 'flex', justifyContent: 'center', marginTop: '0px' }}>
        <Figure.Image
         style={{ width: '150%', maxWidth: '100%', height: '250px', objectFit: 'contain' }}
         alt="Banner Image"
         src={url + "static/PolticalAds.png"}
        />
       </Row>
      </Container></Col>

     </Row>
     {/* <Row>
      <Col>
       <iframe
        src={url + "grapdads/silent_period_1.html"}
        title="Plotly Plot"
        width="100%"
        height="600px"
       />
      </Col></Row><Row>
      <Col>
       <iframe
        src={url + "grapdads/silent_period_phase.html"}
        title="Plotly Plot"
        width="100%"
        height="600px"
       />
      </Col></Row><Row>
      <Col>
       <iframe
        src={url + "grapdads/silent_period_phase1.html"}
        title="Plotly Plot"
        width="100%"
        height="600px"
       />
      </Col>  
     </Row> */}
    </Container>


    <ToggleSwitch />
   </Tab>
   {/* <Tab eventKey="Memes" title="Memes">
     
     <Container>
     <Row><Col >
     <Row className="justify-content-center">
        <h4 className="text-center mb-4">Meme Model</h4>
      </Row>
      <Form onSubmit={(e)=>SubmitMemes(e)}>
    <Form.Group className="mb-3" controlId="Memes.img"  >
        <Form.Label>Enter Text to check content</Form.Label>
        <Form.Control required type="file"  onChange={(e)=>{setmemesurl(e.target.files[0])}}  /> <br/>
        <Form.Label>Enter Memes Text </Form.Label>
        <Form.Control required as="textarea" rows={1} onChange={(e)=>{setMemesText(e.target.value)}} />

              </Form.Group>

              <Button variant="primary" type='submit'>
      Submit
      </Button>
      <br />
    


    </Form> </Col>
    <Col> <Container>
    <Row className="justify-content-center">
        <h4 className="text-center mb-4">Architecture</h4>
      </Row>
        <Row style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
    <Figure.Image
        style={{ width: '150%', maxWidth: '100%', height: '300px', objectFit: 'contain' }}
        alt="Banner Image"
        src={url+"static/ToxicMemes.svg"}
    />
</Row>
    </Container></Col></Row>
    
    <Row>
    {memsres.length>0 &&  "Meme is " +memsres}
    {memsres.length>0 && "Explanantion is "+memsres}
    </Row> 
      </Container>

      </Tab> */}
   <Tab eventKey="Memes" title="Toxic Memes">
    <Container>
     <Row>
      <Col>
       <Row className="justify-content-center">
        <h4 className="text-center mb-4">Meme Model</h4>
       </Row>
       <Form onSubmit={(e) => SubmitMemes(e)}>
        <Form.Group className="mb-3" controlId="Memes.img">
         <Form.Label>Enter Text to check content</Form.Label>
         <Form.Control required type="file" onChange={(e) => { setmemesurl(e.target.files[0]) }} /> <br />
         <Form.Label>Enter Memes Text </Form.Label>
         <Form.Control as="textarea" rows={1} onChange={(e) => { setMemesText(e.target.value) }} />
        </Form.Group>
        <Button variant="primary" type='submit'>
         Submit
        </Button>
        <br />
       </Form><br />
       {memsres.length > 0 &&
        <div style={{ border: '2px solid #ccc', paddingLeft: '10px', paddingTop: '10px', borderRadius: '5px', width: '100%' }}>

         {/* <Figure.Image
                    style={{ width: '150%', maxWidth: '100%', height: '250px', objectFit: 'contain' }}
                    alt="Banner Image"
                    src={url + "toxic/" + toxicpath}
                  />
                  <br /> */}
         <p>Meme is: <strong>{memsres}</strong></p>
         {/* <p><strong>Explanation :</strong> {memsres} as it doesnot contain any abusive words</p> */}
        </div>
       }
      </Col>
      <Col>
       <Container>
        <Row className="justify-content-center">
         <h4 className="text-center mb-4">Architecture</h4>
        </Row>
        <Row style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
         <Figure.Image
          style={{ width: '150%', maxWidth: '100%', height: '300px', objectFit: 'contain' }}
          alt="Banner Image"
          src={url + "static/ToxicMemesUpdated.png"}
         />
        </Row>
       </Container>
      </Col>
     </Row>

     <Row>
      <Col>
       <ClassificationReportBarplotMemes />
       {/* {memsres.length > 0 &&
    <div style={{ border: '2px solid #ccc', padding: '10px', borderRadius: '5px', width: '40%' }}>
      <p><strong>Meme is:</strong> {memsres}</p>
      <p><strong>Explanation is:</strong> {memsres}</p>
    </div>
  } */}
      </Col>
     </Row>
    </Container>

   </Tab>


   <Tab eventKey="About" title="About Us">
    <Container>
     <Row>
      <About />

     </Row>

    </Container>
   </Tab>


  </Tabs><br /><br />
  <footer className='foter' style={{ "fontFamily": "Noto Sans,sans-serif", "backgroundColor": "#f5f5f5", "borderTopWidth": "2px", "borderTopStyle": "solid", "borderTopColor": "#ccc" }}>

   <div style={{ "textAlign": "center" }}>
    Copyright © 2024,iHub Data,International Institute of Information Technology, Hyderabad. All rights reserved
   </div>
   <div style={{ "textAlign": "center", "fontFamily": "Noto Sans,sans-serif" }}>

   </div>
   <div>
   </div>
  </footer>
 </>
 );
}