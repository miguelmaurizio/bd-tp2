#!/usr/bin/env python
# -*- coding: utf-8 -*-

import csv
import os
import re

# Get path to this script.
scriptDirectory = os.path.dirname(__file__)

# Define number of columns for output file.
numShards = 5
numColumns = numShards + 1          # Additional column for total doc count.


def main():
  export('hashed')
  export('ranges')


def export(experimentId):
  for experimentNumber in range(1, 10 + 1):
    logFilePath = os.path.join(scriptDirectory, '../log/experiment-' + experimentId + '-' + str(experimentNumber) + '.log')
    csvFilePath = os.path.join(scriptDirectory, '../csv/experiment-' + experimentId + '-' + str(experimentNumber) + '.csv')
    documentCounts = []
    with open(logFilePath ,'r') as logFile:
      valuesRead = None
      for line in logFile:
        if line.startswith('Starting batch'):
          valuesRead = 0
        elif line.startswith('Totals'):
          for i in range(numShards - valuesRead):
            documentCounts.append(0);
        else:
          match = re.search("docs : ([0-9]+)", line)
          if match:
            documentCounts.append(match.group(1))
            valuesRead = valuesRead + 1
    assert len(documentCounts) % numColumns == 0
    with open(csvFilePath, 'wb') as csvFile:
      csvWriter = csv.writer(csvFile)
      header = ["shard" + str(i) for i in range(1, numShards + 1)] + ['total']
      csvWriter.writerow(header)
      for batchIndex in range(0, len(documentCounts) / numColumns):
        first = batchIndex * numColumns
        last = first + numColumns
        csvRow = documentCounts[first : last]
        csvWriter.writerow(csvRow)


if __name__ == '__main__':
  main()
