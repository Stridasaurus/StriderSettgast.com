---
title: "The Discrete Fourier Transform: From Sums to Spectra"
date: 2024-06-15
description: "A derivation of the DFT, its matrix form, and a NumPy implementation — with notes on why the twiddle factor shows up where it does."
tags: ["signal processing", "mathematics", "python"]
---

The Discrete Fourier Transform is one of those results that looks intimidating on first contact and obvious in retrospect. Here's the version that clicked for me.

## Setup

We have a finite sequence $x[n]$ of length $N$, indexed $n = 0, 1, \ldots, N-1$. We want to decompose it into a sum of complex exponentials — sinusoids at discrete frequencies. The DFT gives us the $N$ complex coefficients $X[k]$ that do exactly that.

## The Transform Pair

The forward DFT and its inverse are:

$$
\begin{aligned}
X[k] &= \sum_{n=0}^{N-1} x[n]\, e^{-j 2\pi kn / N}, \quad k = 0, 1, \ldots, N-1 \\[6pt]
x[n] &= \frac{1}{N} \sum_{k=0}^{N-1} X[k]\, e^{\,j 2\pi kn / N}, \quad n = 0, 1, \ldots, N-1
\end{aligned}
$$

The factor $e^{-j 2\pi / N}$ appears so often it gets its own name: the *twiddle factor* $W_N = e^{-j 2\pi / N}$. With it, $X[k] = \sum_{n=0}^{N-1} x[n]\, W_N^{kn}$.

## Matrix Form

For small $N$, it's useful to write the DFT as a matrix-vector product $\mathbf{X} = \mathbf{F}\,\mathbf{x}$, where $\mathbf{F}$ is the $N \times N$ DFT matrix with entries $F_{kn} = W_N^{kn}$:

$$
\mathbf{F} = \begin{pmatrix}
1 & 1 & 1 & \cdots & 1 \\
1 & W_N & W_N^2 & \cdots & W_N^{N-1} \\
1 & W_N^2 & W_N^4 & \cdots & W_N^{2(N-1)} \\
\vdots & \vdots & \vdots & \ddots & \vdots \\
1 & W_N^{N-1} & W_N^{2(N-1)} & \cdots & W_N^{(N-1)^2}
\end{pmatrix}
$$

This is just the Vandermonde matrix evaluated at the $N$-th roots of unity. The FFT algorithm exploits this structure to reduce the $\mathcal{O}(N^2)$ matrix multiply to $\mathcal{O}(N \log N)$.

## Python Implementation

Here's a naive $\mathcal{O}(N^2)$ DFT alongside NumPy's FFT, so you can verify they agree:

```python
import numpy as np

def dft_naive(x: np.ndarray) -> np.ndarray:
    """Compute the DFT of x using the definition directly."""
    N = len(x)
    W = np.exp(-2j * np.pi / N)
    k = np.arange(N)
    n = k.reshape((N, 1))          # column vector
    F = W ** (n * k)               # N×N twiddle matrix
    return F @ x

# --- verify ---
x = np.array([1.0, 2.0, 3.0, 4.0])

X_naive = dft_naive(x)
X_numpy = np.fft.fft(x)

print("Naive DFT:", np.round(X_naive, 6))
print("NumPy FFT:", np.round(X_numpy, 6))
print("Max error:", np.max(np.abs(X_naive - X_numpy)))
```

Output:
```
Naive DFT: [10.+0.j -2.+2.j -2.+0.j -2.-2.j]
NumPy FFT: [10.+0.j -2.+2.j -2.+0.j -2.-2.j]
Max error: 0.0
```

## What the Coefficients Mean

$X[0]$ is always the DC component — the sum of all samples. $X[k]$ for $k > 0$ gives the amplitude and phase of the sinusoid at normalized frequency $k/N$. For real-valued $x[n]$, the spectrum is conjugate symmetric: $X[N-k] = X[k]^*$, so only the first $N/2 + 1$ bins carry unique information.

That's the full picture. The FFT is just a recursive factorization of this same computation.
