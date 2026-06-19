---
title: "Leaky Integrate-and-Fire Neuron Simulator"
description: "A Python simulator of the leaky integrate-and-fire neuron model, treating the cell membrane as an RC circuit and integrating its potential numerically while detecting spikes. Every neuron parameter can be supplied as an arbitrary function of time."
link: "https://stridasaurus.github.io/LIF-project/"
tags: ["Computational neuroscience", "Python", "Numerical methods"]
---

A simulation of the leaky integrate-and-fire (LIF) neuron, where input current
charges an RC-circuit membrane until it crosses threshold and fires. Parameters
like input current, resistance, and threshold can each be specified as
functions of time, with the membrane potential integrated via Euler's method.
