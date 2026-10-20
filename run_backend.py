"""
BachatBites - Quick Start Script for Flask Backend 🐍
Launches the Flask application on http://127.0.0.1:5000
"""

import os
import sys
import subprocess

if __name__ == "__main__":
    venv_python = os.path.join(os.path.dirname(__file__), ".venv", "Scripts", "python.exe")
    python_cmd = venv_python if os.path.exists(venv_python) else sys.executable
    
    app_file = os.path.join(os.path.dirname(__file__), "app.py")
    print("\n" + "="*65)
    print(" [BachatBites] Launching Flask Backend")
    print("="*65)
    print(" Server URL:      http://127.0.0.1:5000")
    print(" Search API:      http://127.0.0.1:5000/api/restaurants")
    print(" Deal Engine:     Active (Eligibility & Discount Calculator)")
    print(" AI Deal Engine:  Active (Gemini 2.5 Flash / Heuristic Fallback)")
    print("="*65 + "\n")
    
    subprocess.run([python_cmd, app_file])
