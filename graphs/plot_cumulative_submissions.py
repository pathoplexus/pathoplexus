import requests
import matplotlib.pyplot as plt
import matplotlib.dates as mdates
import datetime

PATHOPLEXUS_URL = "https://pathoplexus.org"
LAPIS_URL = "https://lapis.pathoplexus.org"

loculus_info = requests.get(f"{PATHOPLEXUS_URL}/loculus-info").json()
organisms = list(loculus_info["organisms"].keys())
print(f"Fetched {len(organisms)} organisms from {PATHOPLEXUS_URL}/loculus-info: {organisms}")

submitting_groups = set()
submitted_at_timestamps = []
became_open_at_dates = []

for organism in organisms:
    print(f"Fetching cumulative submissions for {organism}...")
    response = requests.get(
        f"{LAPIS_URL}/{organism}/sample/details",
        params={
            "advancedQuery": "NOT groupName='Automated Ingest from INSDC/NCBI Virus by Loculus'",
            "versionStatus": "LATEST_VERSION",
            "isRevocation": "false",
            "fields": ["accessionVersion", "groupName", "submittedAtTimestamp", "dataBecameOpenAt"],
            "dataFormat": "JSON",
            "downloadAsFile": False,
        },
        headers={"accept": "application/json"},
    )   
    data = response.json()
    print(data["data"][:2])  # Print first 2 samples to verify structure
    print(f"Fetched {len(data['data'])} samples for {organism}")
    for sample in data["data"]:
        submitting_groups.add(sample["groupName"])
        submitted_at_timestamps.append(sample["submittedAtTimestamp"])
        became_open_at_dates.append(sample["dataBecameOpenAt"])

print(f"Number of Submitting groups: {len(submitting_groups)}")
print(f"Number of samples submitted directly to Pathoplexus: {len(submitted_at_timestamps)}")

## Plot cumulative submissions over time                                                 
submitted_at_datetimes = [datetime.datetime.fromtimestamp(ts) for ts in submitted_at_timestamps]                      
submitted_at_datetimes.sort()                                                                                         
cumulative_counts = list(range(1, len(submitted_at_datetimes) + 1))   
                                                                                                                    
plt.figure(figsize=(10, 6))                                                                                           
plt.plot(submitted_at_datetimes, cumulative_counts, marker="o", color="gold", markerfacecolor="gold",                 
markeredgecolor="goldenrod")                                                                                      
plt.fill_between(submitted_at_datetimes, cumulative_counts, color="gold", alpha=0.3)                                                           

plt.rcParams["figure.dpi"] = 300        # high resolution for print                                                   
plt.rcParams["font.size"] = 14          # base font size (scales everything)                                          
                                                                                                                                                                                                                                  
plt.title("Cumulative Submissions Over Time", fontsize=28, fontweight="bold")                                         
plt.xlabel("Submission Date", fontsize=22)                                                                            
plt.ylabel("Cumulative Submissions", fontsize=22)                                                                     
plt.tick_params(axis="both", labelsize=13) 

plt.gca().xaxis.set_major_locator(mdates.MonthLocator())
plt.gca().xaxis.set_major_formatter(mdates.DateFormatter("%Y-%m"))                                                                                                                                                                                             
plt.gcf().autofmt_xdate()                                                                                             
plt.grid(axis="y", linestyle="--", linewidth=0.7, color="lightgray")                                                  
plt.gca().set_axisbelow(True)  # gridlines behind the data                                                            
plt.tight_layout()                                                                                                    
plt.show()  
