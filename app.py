import json
import sys
from model.prediction import predict_patient

def run_verification_workflow(patient_data):
    """
    Workflow:
    1. Receive Input Data
    2. Process through Prediction Engine (Preprocessing + Inference)
    3. Display Detailed Risk Assessment
    """
    print("\n" + "█"*60)
    print(" [1] DATA INPUT RECEIVED")
    print("█"*60)
    # Display the input data in a readable format
    display_data = {k: v for k, v in patient_data.items() if v is not None}
    print(json.dumps(display_data, indent=4))

    print("\n" + "█"*60)
    print(" [2] MODEL VERIFICATION & PROCESSING")
    print("█"*60)
    print("[*] Mapping ICD-9 Diagnosis codes...")
    print("[*] Calculating clinical risk heuristics...")
    
    # Run the prediction logic
    result = predict_patient(patient_data)
    
    print(f"[*] Model Raw Confidence: {result.get('model_confidence', 0)}")
    print("[SUCCESS] Verification Complete.")

    print("\n" + "█"*60)
    print(" [3] FINAL READMISSION RISK DISPLAY")
    print("█"*60)
    
    # Status markers
    risk = result['risk_level'].upper()
    print(f"STATUS         : >>> {risk} <<<")
    print(f"RISK SCORE     : {result['probability']} / 1.0")
    print(f"RECOMMENDATION : {result['recommendation']}")
    
    if 'clinical_indicators' in result:
        print("\nEXPLAINABLE RISK FACTORS:")
        for key, detected in result['clinical_indicators'].items():
            marker = "[!]" if detected else "[ ]"
            label = key.replace('_', ' ').title()
            print(f" {marker} {label}")
            
    print("█"*60 + "\n")

def start_interactive_session():
    print("\n" + "="*60)
    print(" EXPLAINABLE RETINAL AI PLATFORM - VERIFICATION WORKFLOW ")
    print("="*60)
    print("Enter patient metrics below to verify risk.")
    print("(Type 'test' for a quick high-risk sample, or 'exit' to quit)\n")

    while True:
        try:
            val = input("Number of previous Inpatient Visits (or 'test'/'exit'): ").strip().lower()
            if val == 'exit': break
            
            if val == 'test':
                # Pre-defined High Risk Sample
                patient = {
                    "age": "[70-80)", 
                    "number_inpatient": 6, 
                    "number_emergency": 3,
                    "num_medications": 25, 
                    "A1Cresult": ">8", 
                    "diag_1": "250.02", 
                    "insulin": "Up",
                    "change": "Ch"
                }
            else:
                # Gather individual data points
                inpatient = int(val) if val else 0
                emergency = int(input("Number of Emergency Visits: ") or 0)
                a1c = input("A1C Result (None, Norm, >7, >8): ") or "None"
                diag = input("Primary Diagnosis Code (e.g. 250): ") or "250"
                insulin = input("Insulin Status (No, Steady, Up, Down): ") or "No"
                meds = int(input("Number of Medications: ") or 10)
                
                patient = {
                    "number_inpatient": inpatient,
                    "number_emergency": emergency,
                    "A1Cresult": a1c,
                    "diag_1": diag,
                    "insulin": insulin,
                    "num_medications": meds,
                    "age": "[60-70)",
                    "change": "No"
                }

            # Execute the workflow
            run_verification_workflow(patient)
            
        except ValueError:
            print("\n[Error] Please enter a valid number or command.")
        except Exception as e:
            print(f"\n[Error] {str(e)}")

if __name__ == "__main__":
    start_interactive_session()
