import json
import os
from time import sleep

import requests

organisms = ["ebola-sudan", "ebola-zaire", "mpox", "west-nile", "cchf"]
slack_webhook_url = os.environ["SLACK_WEBHOOK_URL"]

params = {
    "dataFormat": "json",
    "downloadAsFile": "false",
    "fields": ",".join(
        [
            "accessionVersion",
            "authorAffiliations",
            "dataUseTerms",
            "geoLocCountry",
            "groupName",
            "sampleCollectionDate",
        ]
    ),
}

for organism in organisms:
    base_url = f"https://lapis.pathoplexus.org/{organism}"
    url = f"{base_url}/sample/details"
    data = requests.get(url, params=params).json()["data"]

    notified_file = f"already_notified/notified_{organism}.txt"
    if os.path.exists(notified_file):
        with open(notified_file, "r") as f:
            notified = {line.strip() for line in f if line.strip()}
    else:
        notified = set()

    new_sequences = [seq for seq in data if seq["accessionVersion"] not in notified]

    if new_sequences:
        # include url with filter
        new_accession_versions = ",".join(
            seq["accessionVersion"] for seq in new_sequences
        )
        filter_url = (
            f"https://pathoplexus.org/{organism}/search?accession={new_accession_versions}"
        )
        message = f"New sequences for {organism}:\n" + "\n\n".join(
            json.dumps(seq, indent=2) for seq in new_sequences
        )
        thread_header = (
            f"{len(new_sequences)} new releases for {organism}: "
        )
        print(f"Sending notification for {organism}")
        res=requests.post(
            slack_webhook_url, json={"text": message, "header": thread_header, "filterUrl": filter_url}
        )
        if res.status_code != 200:
            print(f"Failed to send notification for {organism}")
            print(res.text)
            continue
        print(f"Notification successfully sent for {organism}")
        with open(notified_file, "a") as f:
            for seq in new_sequences:
                f.write(seq["accessionVersion"] + "\n")
        sleep(5)
    else:
        print(f"No new sequences for {organism}")
