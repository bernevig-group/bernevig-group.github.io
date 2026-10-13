"""Compute the research figures used on the site and save them to public/figures/.

Every figure is a small, real calculation (tight-binding bands, Berry curvature,
exact diagonalization), so the images look like the figures in our papers.

Usage: python scripts/make_figures.py
"""
import pathlib

import matplotlib
matplotlib.use("Agg")
import matplotlib.pyplot as plt
import numpy as np

OUT = pathlib.Path(__file__).resolve().parent.parent / "public" / "figures"
OUT.mkdir(parents=True, exist_ok=True)

ORANGE, BLUE, GRAY = "#d26a00", "#2f5d8a", "#9a9a9a"
plt.rcParams.update({
    "font.family": "serif", "font.serif": ["DejaVu Serif"], "mathtext.fontset": "dejavuserif",
    "font.size": 13, "axes.linewidth": 1.1, "xtick.direction": "in", "ytick.direction": "in",
    "xtick.top": True, "ytick.right": True, "savefig.dpi": 160,
})


def save(fig, name):
    fig.savefig(OUT / name, bbox_inches="tight", facecolor="white")
    plt.close(fig)
    print("wrote", name)


# ------------------------------------------------------------- twisted bilayer moire
def moire(name, W, H, a, theta_deg):
    """Two triangular lattices of atoms (lattice constant a, in pixels) twisted by theta."""
    theta = np.deg2rad(theta_deg)
    y, x = np.mgrid[0:H, 0:W].astype(float)
    x -= W / 2
    y -= H / 2
    G = [4 * np.pi / (np.sqrt(3) * a) * np.array([np.cos(t), np.sin(t)])
         for t in np.pi / 6 + 2 * np.pi / 3 * np.arange(3)]

    def layer(rot):
        c, s = np.cos(rot), np.sin(rot)
        f = sum(np.cos((c * g[0] - s * g[1]) * x + (s * g[0] + c * g[1]) * y) for g in G)
        return np.exp(0.9 * (f - 3))  # a soft peak at each atom

    img = layer(-theta / 2) + layer(theta / 2)
    fig = plt.figure(figsize=(W / 160, H / 160))
    ax = fig.add_axes([0, 0, 1, 1])
    ax.imshow(img, cmap="Greys", vmin=0, vmax=1.5, interpolation="bilinear")
    ax.axis("off")
    fig.savefig(OUT / name, facecolor="white")
    plt.close(fig)
    print("wrote", name)


# ------------------------------------------------- Kane-Mele zigzag ribbon edge states
def kane_mele_ribbon():
    N, t, t2, nk = 32, 1.0, 0.12, 241
    # honeycomb: A at 0, B at (a1+a2)/3; hops given as (from, to, d1, d2, amplitude)
    def hops(phi):
        h = [(0, 1, 0, 0, t), (0, 1, -1, 0, t), (0, 1, 0, -1, t)]
        for d in [(1, 0), (-1, 1), (0, -1)]:
            h.append((0, 0, *d, t2 * np.exp(1j * phi)))
            h.append((1, 1, *d, t2 * np.exp(-1j * phi)))
        return h

    ks = np.linspace(0, 2 * np.pi, nk)
    fig, ax = plt.subplots(figsize=(5.0, 3.6))
    for phi in (np.pi / 2, -np.pi / 2):  # spin up, spin down
        E_all, w_all = [], []
        for k in ks:
            Hk = np.zeros((2 * N, 2 * N), complex)
            for s, s2, d1, d2, amp in hops(phi):
                for n in range(N):
                    m = n + d2
                    if 0 <= m < N:
                        Hk[2 * m + s2, 2 * n + s] += amp * np.exp(-1j * k * d1)
            Hk = Hk + Hk.conj().T
            E, V = np.linalg.eigh(Hk)
            p = np.abs(V) ** 2
            rows = p.reshape(N, 2, -1).sum(1)
            w = rows[:3].sum(0) - rows[-3:].sum(0)
            E_all.append(E)
            w_all.append(w)
        E_all, w_all = np.array(E_all), np.array(w_all)
        kk = np.repeat(ks[:, None], E_all.shape[1], 1)
        bulk = np.abs(w_all) < 0.5
        ax.scatter(kk[bulk], E_all[bulk], s=0.6, c=GRAY, lw=0)
        ax.scatter(kk[w_all >= 0.5], E_all[w_all >= 0.5], s=2.5, c=ORANGE, lw=0)
        ax.scatter(kk[w_all <= -0.5], E_all[w_all <= -0.5], s=2.5, c=BLUE, lw=0)
    ax.set_xlim(0, 2 * np.pi)
    ax.set_ylim(-3.2, 3.2)
    ax.set_xticks([0, np.pi, 2 * np.pi], ["0", r"$\pi$", r"$2\pi$"])
    ax.set_xlabel(r"Momentum $k_x$")
    ax.set_ylabel(r"Energy $E/t$")
    save(fig, "edge_states.png")


# ---------------------------------------------------------------- kagome flat band
def kagome_bands():
    t = 1.0
    G, K, M = np.array([0, 0]), np.array([4 * np.pi / 3, 0]), np.array([np.pi, np.pi / np.sqrt(3)])
    path = [G, K, M, G]
    seg = [np.linalg.norm(path[i + 1] - path[i]) for i in range(3)]
    ks, xs, x0 = [], [], 0.0
    for i in range(3):
        for s in np.linspace(0, 1, 160, endpoint=(i == 2)):
            ks.append(path[i] + s * (path[i + 1] - path[i]))
            xs.append(x0 + s * seg[i])
        x0 += seg[i]
    a1, a2 = np.array([1, 0]), np.array([0.5, np.sqrt(3) / 2])
    bands = []
    for k in ks:
        c1, c2, c3 = np.cos(k @ a1 / 2), np.cos(k @ a2 / 2), np.cos(k @ (a2 - a1) / 2)
        Hk = -2 * t * np.array([[0, c1, c2], [c1, 0, c3], [c2, c3, 0]])
        bands.append(np.linalg.eigvalsh(Hk))
    bands = np.array(bands)
    fig, (lat, ax) = plt.subplots(1, 2, figsize=(6.4, 3.6), width_ratios=[1, 1.7])
    # left: the kagome lattice, all bonds of length 1/2
    sites = np.array([i * a1 + j * a2 + off for i in range(-4, 5) for j in range(-4, 5)
                      for off in (0 * a1, a1 / 2, a2 / 2)])
    dmat = np.linalg.norm(sites[:, None] - sites[None], axis=-1)
    for i, j in zip(*np.nonzero(np.triu(np.abs(dmat - 0.5) < 1e-6))):
        lat.plot(*sites[[i, j]].T, c="k", lw=1.0)
    lat.scatter(*sites.T, s=10, c="k", zorder=2)
    lat.set_xlim(-1.1, 1.1)
    lat.set_ylim(-1.5, 1.5)
    lat.set_aspect("equal")
    lat.axis("off")
    ax.plot(xs, bands[:, 0], c="k", lw=1.6)
    ax.plot(xs, bands[:, 1], c="k", lw=1.6)
    ax.plot(xs, bands[:, 2], c=ORANGE, lw=2.4)
    ticks = np.cumsum([0] + seg)
    for x in ticks[1:-1]:
        ax.axvline(x, c=GRAY, lw=0.8)
    ax.set_xticks(ticks, [r"$\Gamma$", "K", "M", r"$\Gamma$"])
    ax.set_xlim(0, ticks[-1])
    ax.set_ylim(-4.4, 2.8)
    ax.set_ylabel(r"Energy $E/t$")
    fig.tight_layout(w_pad=0.5)
    save(fig, "kagome.png")


# --------------------------------------------------- Berry curvature of a Chern band
def berry_curvature():
    t, t2, phi, Mz, n = 1.0, 0.07, np.pi / 2, 0.0, 360
    a1, a2 = np.array([1, 0]), np.array([0.5, np.sqrt(3) / 2])
    d1 = (a1 + a2) / 3
    nn = [d1, d1 - a1, d1 - a2]
    nnn = [a1, a2 - a1, -a2]
    L = 2.2 * np.pi
    kx, ky = np.meshgrid(np.linspace(-L, L, n), np.linspace(-L * 0.62, L * 0.62, int(n * 0.62)))
    k = np.stack([kx, ky], -1)
    f = sum(np.exp(1j * (k @ d)) for d in nn) * t
    dz = Mz - 2 * t2 * np.sin(phi) * sum(np.sin(k @ v) for v in nnn)
    H = np.zeros(kx.shape + (2, 2), complex)
    H[..., 0, 0], H[..., 1, 1] = dz, -dz
    H[..., 0, 1], H[..., 1, 0] = np.conj(f), f
    _, V = np.linalg.eigh(H)
    u = V[..., :, 0]
    def ov(p, q):
        return np.sum(np.conj(p) * q, -1)
    F = np.angle(ov(u[:-1, :-1], u[:-1, 1:]) * ov(u[:-1, 1:], u[1:, 1:])
                 * ov(u[1:, 1:], u[1:, :-1]) * ov(u[1:, :-1], u[:-1, :-1]))
    F *= np.sign(F.sum())  # one Chern band: curvature has a single sign
    fig, ax = plt.subplots(figsize=(5.0, 3.6))
    ax.imshow(F, origin="lower", cmap="Blues", vmin=0, vmax=np.percentile(F, 99.7),
              extent=[kx.min(), kx.max(), ky.min(), ky.max()], aspect="equal")
    r = 4 * np.pi / 3
    hexagon = np.array([[r * np.cos(np.pi / 3 * j), r * np.sin(np.pi / 3 * j)] for j in range(7)])
    ax.plot(*hexagon.T, c="k", lw=1.0)
    ax.set_xlabel(r"$k_x$")
    ax.set_ylabel(r"$k_y$")
    ax.set_xticks([-2 * np.pi, 0, 2 * np.pi], [r"$-2\pi$", "0", r"$2\pi$"])
    ax.set_yticks([-np.pi, 0, np.pi], [r"$-\pi$", "0", r"$\pi$"])
    save(fig, "berry_curvature.png")


# ------------------------------------------------------ PXP chain: scarred eigenstates
def pxp_scars():
    L = 16
    basis = [s for s in range(1 << L)
             if not (s & ((s << 1) | (s >> (L - 1))) & ((1 << L) - 1))]
    index = {s: i for i, s in enumerate(basis)}
    D = len(basis)
    H = np.zeros((D, D))
    for i, s in enumerate(basis):
        for j in range(L):
            left, right = (j - 1) % L, (j + 1) % L
            if not (s >> left) & 1 and not (s >> right) & 1:
                H[index[s ^ (1 << j)], i] = 1.0
    E, V = np.linalg.eigh(H)
    neel = int("10" * (L // 2), 2)
    ov = np.abs(V[index[neel]]) ** 2
    keep = ov > 1e-14
    fig, ax = plt.subplots(figsize=(5.0, 3.6))
    ax.scatter(E[keep], np.log10(ov[keep]), s=5, c=GRAY, lw=0)
    # top state in each of the equally spaced towers
    top = []
    for c in np.arange(-L / 1.0, L / 1.0, 1.33):
        win = keep & (np.abs(E - c) < 0.6)
        if win.any():
            j = np.flatnonzero(win)[np.argmax(ov[win])]
            if np.log10(ov[j]) > -6:
                top.append(j)
    ax.scatter(E[top], np.log10(ov[top]), s=26, c=ORANGE, edgecolors="k", lw=0.6, zorder=3)
    ax.set_xlabel(r"Energy $E$")
    ax.set_ylabel(r"$\log_{10}|\langle \mathbb{Z}_2|E\rangle|^2$")
    ax.set_ylim(-9, 0.3)
    save(fig, "scars.png")


# ------------------------------------------------- crystal graph (ML featurization)
def crystal_graph():
    a1, a2 = np.array([1, 0]), np.array([0.5, np.sqrt(3) / 2])
    metal, boron = [], []
    for i in range(-4, 5):
        for j in range(-4, 5):
            R = i * a1 + j * a2
            metal.append(R)
            boron.append(R + (a1 + a2) / 3)
            boron.append(R + 2 * (a1 + a2) / 3)
    metal, boron = np.array(metal), np.array(boron)
    pts = np.vstack([metal, boron])
    kind = np.array([0] * len(metal) + [1] * len(boron))
    box = (np.abs(pts[:, 0]) < 2.6) & (np.abs(pts[:, 1]) < 1.6)
    pts, kind = pts[box], kind[box]
    fig, ax = plt.subplots(figsize=(5.0, 3.6))
    dmat = np.linalg.norm(pts[:, None] - pts[None], axis=-1)
    for i in range(len(pts)):
        for j in range(i + 1, len(pts)):
            if dmat[i, j] < 0.62:
                ax.plot(*pts[[i, j]].T, c=GRAY, lw=0.9, zorder=1)
    ax.scatter(*pts[kind == 0].T, s=150, c=BLUE, edgecolors="k", lw=0.8, zorder=2)
    ax.scatter(*pts[kind == 1].T, s=60, c=ORANGE, edgecolors="k", lw=0.8, zorder=2)
    ax.set_aspect("equal")
    ax.set_xlim(-2.5, 2.5)
    ax.set_ylim(-1.5, 1.5)
    ax.axis("off")
    save(fig, "crystal_graph.png")


if __name__ == "__main__":
    moire("moire_banner.png", 1800, 440, 13.0, 3.0)
    moire("moire.png", 800, 500, 11.0, 4.0)
    kane_mele_ribbon()
    kagome_bands()
    berry_curvature()
    pxp_scars()
    crystal_graph()
