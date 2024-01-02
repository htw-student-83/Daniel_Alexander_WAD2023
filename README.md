## Daniel_Alexander_WAD2023: Klimaneutrale Luft in Berlin/Brandenburg

The app was developed as part of a university project.
It is a simple single page application with a login page, a main page containing a Leaflet-Map and a list of addresses, a form to for adding addresses and a form for deleting or updating addresses. 
All the data represented on the website is stored on a MongoDB database, which is being accessed via a node.js backend server.

## Requirements

* Node v20.10.0
* Git

## Common setup

Clone the repo and install the dependencies.

```bash
git clone https://github.com/htw-student-83/Daniel_Alexander_WAD2023.git
cd Daniel_Alexander_WAD2023
```

```bash
npm install
```

## Steps to start the server

To connect to the MongoDB database, your machine needs to be connected with the HTW network.
You can only access the network, if you are a student or a teacher at the HTW. You can either login at the HTW or follow this tutorial to access the network outside of the HTW:

[Tutorial for VPN connection to the HTW](https://rz.htw-berlin.de/anleitungen/vpn/)

To start the express server, run the following

```bash
npm start
```

Open [http://localhost:3000](http://localhost:3000) and take a look around.
