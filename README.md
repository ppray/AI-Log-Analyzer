# AILogAnalyzer - Chrome Extension for Intelligent Log Analysis

## Overview

AILogAnalyzer is a Chrome extension designed to efficiently and intelligently analyze log files. By integrating advanced artificial intelligence technologies, this extension provides users with fast and accurate log analysis capabilities, simplifying the understanding and processing of complex log information.

## Key Features

1. **Intelligent Analysis**: AILogAnalyzer employs advanced algorithms and machine learning techniques to intelligently analyze various log files, identifying key information and providing valuable context.
2. **Efficiency Optimization**: By automatically filtering and categorizing logs, AILogAnalyzer improves analysis efficiency, enabling users to quickly identify and address issues.
3. **Visual Representation**: Offers an intuitive visual representation, allowing users to gain a clearer understanding of patterns and anomalies within the logs.
4. **Real-time Feedback**: Provides real-time feedback and suggestions, assisting users in making decisions and taking action in the shortest possible time.
5. **Chrome Extension**: As a Chrome extension, AILogAnalyzer seamlessly integrates into your browser, enabling log analysis anytime, anywhere.

## Installation and Configuration

### Installation Steps

1. Download "AILogAnalyzer" from the [gitlab link](https://gitlab-vmw.devops.broadcom.net/rg011725/ai-log-analyzer/-/archive/2.0.0/ai-log-analyzer-2.0.0.zip)
2. Load the unpacked folder in Chrome by navigating to `chrome://extensions/`.

### Configuration Options

Once installed, locate the AILogAnalyzer extension icon in the Chrome browser, right-click, and select "Options" to configure your preferences and log analysis settings.

![settings](https://github.com/ppray/AI-Log-Analyzer/blob/main/img/setting.png)

**Recommended Configuration:**
- API Endpoint: `https://llm.ai.broadcom.net/api/v1/chat/completions`
- API Key: `****`
- Model: `meta-llama/Meta-Llama-3.1-8B-Instruct`
- Max Tokens: `130000`

## User Guide

1. **Open Log Files**: Open the log file you want to analyze; it should be an online file.
2. **Launch AILogAnalyzer**: AILogAnalyzer is automatically triggered when opening a log file, and the analysis is initialized automatically.
3. **Review Analysis Results**: AILogAnalyzer intelligently analyzes the logs and displays the results in the user interface. Review key information, visual representations, and recommendations.
4. **Interactive Operations (Not Ready)**: Interact with the analysis results, view detailed information, filter logs, and perform other operations to gain a deeper understanding of the log file.

## Samples

1. AI analyze `kubectl_describe_kcp_-A.txt`

![kubectl_log](https://github.com/ppray/AI-Log-Analyzer/blob/main/img/kubectl_log.png)

2. AI analyze `test.log`

![test.log](https://github.com/ppray/AI-Log-Analyzer/blob/main/img/test_log.png)

3. Bug summary

![Bug Summary](https://github.com/ppray/AI-Log-Analyzer/blob/main/img/bug_summary.png)


## Disclaimer

AILogAnalyzer is a tool-based extension, and the developer assumes no responsibility for any issues that may arise during its use. Users are solely responsible for the risks associated with using this extension.

---

Thank you for choosing AILogAnalyzer. We hope it brings convenience and efficiency to your log analysis work!
