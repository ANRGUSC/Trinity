# Trinity
A Publish-Subscribe Broker with Blockchain-based Immutability for the IoT and Supply Chain Monitoring. Applications with multiple stakeholders that rely on a centralized communication model does not guarantee trustless communication. Trinity combines the publish-subscribe broker with the blockchain technology to guarantee persistence, ordering, and
immutability across trust boundaries.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

To run Trinity on your computer, the following broker and blockchain software has to be installed on your machine.

**Tendermint**

Trinity is implemented and evaluated using the Tendermint blockchain framework. Please refer to the following
documentation for [installation of Tendermint](https://github.com/tendermint/tendermint/wiki/Installation).

**Mosquitto MQTT Broker**

MQTT broker is used as a publish-subscribe communication protocol in the implementation and evaluation of Trinity. Please
install MQTT using the following [documentation](https://mosquitto.org/download/).

### Installing

This repository has to be cloned on your machine to install Trinity.

**Step 1**

```
git clone https://github.com/ANRGUSC/Trinity.git
```

And then,

```
npm install
```

Once the above command is successfully executed on your system, trinity and all the other necessary libraries are available for use.

## Running the tests

To test Trinity framework on your machine, the following steps must be followed:

**Step 1**

The brokerABCI application must be started first before starting the Tendermint consensus engine. Start brokerABCI on a terminal:

```
node brokerABCI.js
```

**Step 2**

Before starting the blockchain network, it must be configured appropriately. The following documentation explains the configuration details of the Tendermint framework ([documentation](http://tendermint.readthedocs.io/projects/tools/en/master/specification/configuration.html)).Start the Tendermint blockchain network on a new terminal:

```
tendermint init
```

**Step 3**

The brokerABCI and the blockchain framework are running, and it is ready to receive broker transactions and contracts. Start the trinityMarshall appplication, which pushes the registered topics to the blockchain network for the execution of smart contracts, concensus protocol, and block creation. Start Trinity application on a new terminal:

```
node trinityMarshal.js
```

Now one of the Trinity instance is ready for handling broker transactions.

**Step 4**

Any MQTT publisher can publish the data to the broker running on your machine. Libraries are available in languages such as Python, Node JS, Java, etc., for publishing data to MQTT broker. As an example, we provide Node JS-based application for publishing data. Start a  publisher on a new terminal:

```
node tools/publisher.js
```

Now the data from registered publisher will be verified and stored on the Tendermint Blockchain. To understand the details of the consensus and block creation, please refer to the following [documentation] (http://tendermint.readthedocs.io/projects/tools/en/master/index.html).

## Deployment

Trinity was evaluated on a 20-node Raspberry Pi testbed. All the devices were connected through a LAN. Our preliminary results are available in our article here.

## Built With

* Ubuntu - 16.04.1
* Node - 8.11.2
* Mosquitto - 1.4.10
* Tendermint - 0.19.6

## Contributing

Please read [CONTRIBUTING.md](https://gist.github.com/PurpleBooth/b24679402957c63ec426) for details on our code of conduct, and the process for submitting pull requests to us.

## Versioning

We use [SemVer](http://semver.org/) for versioning. For the versions available, see the [tags on this repository](https://github.com/your/project/tags).

## Authors

* **Gowri Sankar Ramachandran <gsramach@usc.edu>**

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details
