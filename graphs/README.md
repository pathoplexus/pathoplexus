## Graphs

This repo contains a script to plot cumulative Pathoplexus submissions over time and obtain short summary statistics on the number of sequences submitted to Pathoplexus for news articles.

1. Install micromamba if you haven't already.
2. Create and activate the environment:

```bash
micromamba create -f environment.yaml
micromamba activate pp-graphs
```
3. Run the script
```bash
python3 plot_cumulative_submissions.py
```