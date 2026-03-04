import type { backendInterface } from "../backend.d.ts";

export const BODY_SYSTEMS_SEED = [
  {
    name: "Skeletal System",
    slug: "skeletal-system",
    description:
      "The skeletal system forms the rigid framework of the human body, comprising 206 bones in adults that provide structure, protect vital organs, and enable movement.",
    structureText:
      "The adult skeleton has 206 bones divided into the axial skeleton (80 bones: skull, vertebral column, thoracic cage) and the appendicular skeleton (126 bones: upper and lower limbs, pectoral and pelvic girdles). Bone is composed of compact (cortical) and spongy (cancellous/trabecular) tissue. The Haversian canal system runs longitudinally through compact bone, housing blood vessels and nerves. Bone cells include osteoblasts (bone formation), osteoclasts (bone resorption), and osteocytes (maintenance). Long bones have a diaphysis (shaft), epiphyses (ends), periosteum (outer membrane), and medullary cavity containing yellow bone marrow in adults.",
    functionText:
      "Support: Forms the structural framework for the body. Protection: Skull protects brain; vertebrae protect spinal cord; ribs protect heart and lungs. Movement: Acts as levers for muscle action at joints. Blood cell production (Hematopoiesis): Red bone marrow in cancellous bone produces RBCs, WBCs, and platelets. Mineral storage: Stores calcium (99% of body's calcium) and phosphorus. Fat storage: Yellow bone marrow stores adipose tissue as energy reserve.",
    neetPoints:
      "Haversian canal system: central canal + concentric lamellae = osteon. Osteoblasts (build bone) vs Osteoclasts (break down bone). Types of joints: fibrous (sutures), cartilaginous (symphysis), synovial (ball & socket, hinge, pivot, gliding, condyloid, saddle). Bone composition: 70% inorganic (hydroxyapatite - Ca10(PO4)6(OH)2) + 30% organic (collagen). Sesamoid bones: embedded in tendons (e.g., patella). Fontanelle: soft spots in infant skull that ossify. Endochondral ossification vs Intramembranous ossification. Rickets: Vitamin D deficiency → defective mineralization in children.",
    commonDisorders:
      "Osteoporosis: Decreased bone density, fracture risk. Rickets (children) / Osteomalacia (adults): Vitamin D deficiency. Arthritis: Rheumatoid (autoimmune) or Osteoarthritis (wear and tear). Osteosarcoma: Bone cancer. Fractures: Greenstick, Comminuted, Stress, Compound. Scoliosis: Abnormal lateral spinal curvature. Paget's disease: Abnormal bone remodeling. Gout: Uric acid crystal deposition in joints.",
    diagramUrl: "/assets/generated/diagram-skeletal.dim_600x700.jpg",
  },
  {
    name: "Nervous System",
    slug: "nervous-system",
    description:
      "The nervous system is the body's master control and communication network, coordinating responses to internal and external stimuli through electrical and chemical signals.",
    structureText:
      "Divided into Central Nervous System (CNS: brain + spinal cord) and Peripheral Nervous System (PNS: cranial nerves, spinal nerves, ganglia). The brain has 4 lobes: frontal (voluntary movement, speech, reasoning), parietal (sensory integration), temporal (hearing, memory), occipital (vision). Neurons: cell body (soma) with axons (carry impulses away) and dendrites (receive impulses). Myelin sheath (Schwann cells in PNS, oligodendrocytes in CNS) speeds up conduction. Nodes of Ranvier are gaps in myelin enabling saltatory conduction. Synapse: junction between neurons using neurotransmitters (acetylcholine, dopamine, serotonin).",
    functionText:
      "Sensory function: Detects changes in internal and external environment via sensory neurons (afferent). Motor function: Responds through motor neurons (efferent) controlling muscles and glands. Integration: Interneurons process and interpret sensory information. Autonomic functions: Regulates heartbeat, breathing, digestion (Autonomic Nervous System). Reflex arc: Rapid protective responses without conscious thought. Cognition, memory, language, and emotion are higher brain functions.",
    neetPoints:
      "Resting membrane potential: -70 mV (maintained by Na+/K+ ATPase pump). Action potential: Depolarization → Repolarization → Hyperpolarization. All-or-nothing principle. Synapse types: Electrical (gap junctions) vs Chemical (neurotransmitters). Reflex arc: Receptor → Afferent neuron → Spinal cord → Efferent neuron → Effector. Knee jerk reflex: Monosynaptic reflex. Neurotransmitters: ACh (muscle), Dopamine (reward), Serotonin (mood), GABA (inhibitory), Glutamate (excitatory). Blood-brain barrier. Dermatomes. 12 Cranial nerves.",
    commonDisorders:
      "Alzheimer's disease: Progressive dementia, amyloid plaques, tau tangles. Multiple Sclerosis: Demyelination in CNS. Epilepsy: Abnormal electrical activity causing seizures. Parkinson's disease: Dopamine deficiency in substantia nigra. Meningitis: Inflammation of meninges. Stroke: Cerebrovascular accident (ischemic or hemorrhagic). ALS (Amyotrophic Lateral Sclerosis): Motor neuron disease. Guillain-Barré Syndrome: Autoimmune peripheral neuropathy.",
    diagramUrl: "/assets/generated/diagram-nervous.dim_600x700.jpg",
  },
  {
    name: "Cardiovascular System",
    slug: "cardiovascular-system",
    description:
      "The cardiovascular system is the body's transport network, circulating blood to deliver oxygen and nutrients while removing metabolic waste products from every cell.",
    structureText:
      "The heart is a four-chambered muscular organ: right atrium, right ventricle (pulmonary circuit), left atrium, left ventricle (systemic circuit). Heart valves: Tricuspid (RA→RV), Pulmonary (RV→pulmonary artery), Mitral/Bicuspid (LA→LV), Aortic (LV→aorta). Blood vessels: Arteries (carry blood away from heart, thick walls, high pressure), Veins (carry blood to heart, thin walls, low pressure, valves), Capillaries (exchange of gases/nutrients). Total blood volume ≈ 5L in adults. Cardiac conduction: SA node (pacemaker, 60-100 bpm) → AV node → Bundle of His → Purkinje fibers.",
    functionText:
      "Oxygen transport: Carries oxygenated blood from lungs to body tissues via left heart. CO2 removal: Returns deoxygenated blood to lungs via right heart. Nutrient distribution: Delivers glucose, amino acids, fats from GI tract. Waste removal: Transports metabolic wastes to kidneys. Hormone transport: Carries hormones from endocrine glands to target organs. Thermoregulation: Distributes heat. Immune function: Transports white blood cells. Hemostasis: Platelets and clotting factors prevent blood loss.",
    neetPoints:
      "Cardiac cycle: Systole (contraction) + Diastole (relaxation). Stroke volume × Heart rate = Cardiac output. Normal BP: 120/80 mmHg. Systolic = ventricular contraction; Diastolic = ventricular relaxation. SA node = natural pacemaker. ECG: P wave (atrial depolarization), QRS complex (ventricular depolarization), T wave (ventricular repolarization). ABO blood groups: A, B, AB (universal recipient), O (universal donor). Rh factor. Coronary arteries: Left (LAD + LCX) and Right coronary artery. Frank-Starling law: Increased venous return → Increased cardiac output.",
    commonDisorders:
      "Hypertension: Persistently elevated BP > 140/90 mmHg. Coronary Artery Disease (CAD): Atherosclerosis of coronary arteries. Myocardial Infarction (Heart Attack): Blocked coronary artery → cardiac muscle death. Heart Failure: Inadequate pumping. Arrhythmia: Atrial fibrillation, ventricular tachycardia. Valvular heart disease: Stenosis or regurgitation. Infective Endocarditis: Infection of heart valves. Rheumatic heart disease: Complication of rheumatic fever.",
    diagramUrl: "/assets/generated/diagram-cardiovascular.dim_600x700.jpg",
  },
  {
    name: "Respiratory System",
    slug: "respiratory-system",
    description:
      "The respiratory system facilitates the vital exchange of oxygen and carbon dioxide between the body and the environment, while also regulating blood pH.",
    structureText:
      "Upper respiratory tract: Nasal cavity (filtration, humidification, warming), pharynx, larynx (voice box with vocal cords). Lower respiratory tract: Trachea (C-shaped cartilage rings), bronchi (primary, secondary, tertiary), bronchioles, terminal bronchioles, respiratory bronchioles, alveolar ducts, alveoli. Lungs: Right lung has 3 lobes; Left lung has 2 lobes (space for heart). ~300 million alveoli with thin walls (one cell thick) for efficient gas exchange. Pleura: Visceral (inner) and parietal (outer) layers with pleural fluid. Diaphragm: primary muscle of respiration. Surfactant produced by Type II pneumocytes reduces surface tension in alveoli.",
    functionText:
      "Gas exchange: Oxygen moves from alveoli to blood (pulmonary capillaries); CO2 moves from blood to alveoli. External respiration occurs in lungs; Internal (tissue) respiration occurs at tissue level. Ventilation: Inspiration (diaphragm contracts, thorax expands → air in) and Expiration (diaphragm relaxes → air out). Blood pH regulation: CO2 + H2O ⇌ H2CO3 ⇌ H⁺ + HCO3⁻. Phonation (voice production). Olfaction (smell) via nasal cavity. Protective reflexes: Cough and sneeze.",
    neetPoints:
      "Tidal volume (TV): 500 mL. Inspiratory Reserve Volume (IRV): 3000 mL. Expiratory Reserve Volume (ERV): 1100 mL. Residual Volume (RV): 1200 mL. Vital Capacity = TV + IRV + ERV = 4600 mL. Total Lung Capacity = VC + RV = 5800 mL. Dead space: ~150 mL. Surfactant: DPPC (dipalmitoylphosphatidylcholine), deficient in NRDS. Bohr effect: Increased CO2/H+/temperature shifts oxygen-hemoglobin curve right (decreased O2 affinity). Haldane effect: O2 promotes CO2 release from Hb. Breathing controlled by medullary respiratory centers (DRG, VRG) and pontine centers.",
    commonDisorders:
      "Asthma: Bronchospasm, inflammation of airways. COPD: Emphysema + Chronic Bronchitis; caused by smoking. Pneumonia: Consolidation of lung tissue. Tuberculosis (TB): Mycobacterium tuberculosis. Pulmonary Embolism: Blood clot in pulmonary artery. Lung Cancer: Often linked to smoking; mesothelioma linked to asbestos. Pneumothorax: Air in pleural space. ARDS (Acute Respiratory Distress Syndrome): Severe lung injury.",
    diagramUrl: "/assets/generated/diagram-respiratory.dim_600x700.jpg",
  },
  {
    name: "Digestive System",
    slug: "digestive-system",
    description:
      "The digestive system processes food through mechanical and chemical digestion, absorbing essential nutrients and eliminating waste from the body.",
    structureText:
      "Alimentary canal (GI tract): Mouth → Pharynx → Esophagus (25 cm) → Stomach (J-shaped, ~1.5L capacity) → Small intestine (6-7m: Duodenum + Jejunum + Ileum) → Large intestine (1.5m: Cecum + Colon + Rectum) → Anus. Accessory organs: Salivary glands (parotid, submandibular, sublingual), Liver (largest gland, ~1.5 kg), Gallbladder (stores bile), Pancreas (exocrine + endocrine). Small intestine has villi and microvilli (brush border) increasing surface area 600x to ~250 m². Stomach has rugae; Large intestine has haustra.",
    functionText:
      "Ingestion: Taking food into mouth. Mechanical digestion: Chewing (mastication), churning in stomach, segmentation in small intestine. Chemical digestion: Enzymes break macromolecules into absorbable units. Absorption: Primarily in small intestine via villi/microvilli; water absorption in large intestine. Secretion: Digestive juices, enzymes, hormones. Propulsion: Peristalsis moves food along GI tract. Defecation: Elimination of undigested waste.",
    neetPoints:
      "Salivary amylase: Begins starch digestion in mouth. Pepsin: Activated from pepsinogen by HCl; digests proteins in stomach. Rennin (chymosin): Coagulates milk protein (casein) in infants. Pancreatic enzymes: Trypsin, Chymotrypsin (proteins), Pancreatic amylase (starch), Lipase (fats). Bile: Produced by liver, stored in gallbladder; emulsifies fats. Villi: Finger-like projections; Microvilli: Brush border. Secretin and CCK: Hormones regulating pancreatic and bile secretion. Brunner's glands (Duodenum): Secrete alkaline mucus. Peyer's patches: Lymphoid tissue in ileum. BMI calculation. Jaundice: Bilirubin accumulation.",
    commonDisorders:
      "GERD: Gastroesophageal reflux disease; acid reflux. Peptic Ulcer: H. pylori or NSAID-induced mucosal damage. Appendicitis: Inflammation of appendix; McBurney's point tenderness. Crohn's Disease: Chronic inflammatory bowel disease; skip lesions. Ulcerative Colitis: Continuous mucosal inflammation of colon. Irritable Bowel Syndrome (IBS): Functional GI disorder. Cirrhosis: End-stage liver disease. Pancreatitis: Inflammation of pancreas (acute or chronic). Colorectal Cancer: Adenocarcinoma of colon/rectum.",
    diagramUrl: "/assets/generated/diagram-digestive.dim_600x700.jpg",
  },
];

export const MCQ_SEED = [
  // Skeletal System MCQs (index 0 → systemId TBD)
  {
    systemSlug: "skeletal-system",
    question: "How many bones are present in the adult human skeleton?",
    optionA: "200",
    optionB: "206",
    optionC: "212",
    optionD: "198",
    correctOption: "B",
    explanation:
      "The adult human skeleton consists of 206 bones. At birth, infants have around 270-300 bones, many of which fuse during childhood and adolescence. The axial skeleton has 80 bones and the appendicular skeleton has 126 bones.",
  },
  {
    systemSlug: "skeletal-system",
    question: "Which cells are responsible for bone resorption?",
    optionA: "Osteoblasts",
    optionB: "Osteocytes",
    optionC: "Osteoclasts",
    optionD: "Chondrocytes",
    correctOption: "C",
    explanation:
      "Osteoclasts are large multinucleated cells responsible for bone resorption (breaking down bone tissue). They secrete acids and proteolytic enzymes. Osteoblasts build bone, osteocytes maintain bone, and chondrocytes are cartilage cells.",
  },
  {
    systemSlug: "skeletal-system",
    question:
      "The Haversian canal system is found in which type of bone tissue?",
    optionA: "Spongy (cancellous) bone",
    optionB: "Compact (cortical) bone",
    optionC: "Cartilage",
    optionD: "Periosteum",
    correctOption: "B",
    explanation:
      "The Haversian system (osteon) is the structural unit of compact bone. It consists of a central Haversian canal (containing blood vessels and nerves) surrounded by concentric lamellae. Lacunae between lamellae contain osteocytes connected by canaliculi.",
  },
  // Nervous System MCQs
  {
    systemSlug: "nervous-system",
    question: "What is the resting membrane potential of a typical neuron?",
    optionA: "+70 mV",
    optionB: "-55 mV",
    optionC: "-70 mV",
    optionD: "0 mV",
    correctOption: "C",
    explanation:
      "The resting membrane potential of a typical neuron is approximately -70 mV (inside negative relative to outside). This is maintained by the Na+/K+ ATPase pump (3 Na+ out, 2 K+ in) and selective membrane permeability.",
  },
  {
    systemSlug: "nervous-system",
    question: "Which cells produce myelin in the Central Nervous System?",
    optionA: "Schwann cells",
    optionB: "Astrocytes",
    optionC: "Microglia",
    optionD: "Oligodendrocytes",
    correctOption: "D",
    explanation:
      "Oligodendrocytes produce myelin in the CNS. Each oligodendrocyte can myelinate multiple axons (up to 50). In the PNS, Schwann cells produce myelin, but each Schwann cell myelinates only one axon segment.",
  },
  {
    systemSlug: "nervous-system",
    question: "In a reflex arc, the correct sequence is:",
    optionA:
      "Effector → Motor neuron → Integration center → Sensory neuron → Receptor",
    optionB:
      "Receptor → Afferent neuron → Integration center → Efferent neuron → Effector",
    optionC:
      "Receptor → Efferent neuron → Integration center → Afferent neuron → Effector",
    optionD:
      "Integration center → Receptor → Afferent neuron → Efferent neuron → Effector",
    correctOption: "B",
    explanation:
      "A reflex arc follows: Receptor (detects stimulus) → Afferent/Sensory neuron → Integration center (spinal cord/brain) → Efferent/Motor neuron → Effector (muscle/gland). This allows rapid, involuntary responses without conscious thought.",
  },
  // Cardiovascular MCQs
  {
    systemSlug: "cardiovascular-system",
    question: "What is the normal cardiac output at rest?",
    optionA: "2-3 L/min",
    optionB: "5-6 L/min",
    optionC: "8-10 L/min",
    optionD: "1-2 L/min",
    correctOption: "B",
    explanation:
      "Normal cardiac output at rest is approximately 5-6 L/min. It is calculated as: CO = Stroke Volume × Heart Rate = 70 mL × 72 bpm ≈ 5040 mL/min. During exercise, CO can increase to 20-25 L/min.",
  },
  {
    systemSlug: "cardiovascular-system",
    question: "Which blood group is the universal donor?",
    optionA: "Type A",
    optionB: "Type B",
    optionC: "Type AB",
    optionD: "Type O negative",
    correctOption: "D",
    explanation:
      "Type O negative (O-) is the universal donor for red blood cell transfusions as it lacks A, B, and Rh antigens, minimizing rejection risk. Type AB positive is the universal recipient. In emergencies, O- is used when blood type is unknown.",
  },
  {
    systemSlug: "cardiovascular-system",
    question: "The SA node is located in:",
    optionA: "Left atrium near pulmonary veins",
    optionB: "Right atrium near the superior vena cava",
    optionC: "Interventricular septum",
    optionD: "Left ventricle near apex",
    correctOption: "B",
    explanation:
      "The sinoatrial (SA) node is located in the right atrium near the opening of the superior vena cava. It is the natural pacemaker of the heart, generating electrical impulses at 60-100 beats per minute that initiate each cardiac cycle.",
  },
  // Respiratory MCQs
  {
    systemSlug: "respiratory-system",
    question: "What is the tidal volume in a normal adult?",
    optionA: "150 mL",
    optionB: "1200 mL",
    optionC: "500 mL",
    optionD: "3000 mL",
    correctOption: "C",
    explanation:
      "Tidal volume (TV) is the volume of air inhaled or exhaled in a single normal breath at rest, approximately 500 mL (0.5 L). Of this, about 150 mL is anatomical dead space (in airways), and 350 mL actually reaches the alveoli.",
  },
  {
    systemSlug: "respiratory-system",
    question: "Surfactant in alveoli is produced by:",
    optionA: "Type I pneumocytes",
    optionB: "Type II pneumocytes",
    optionC: "Clara cells",
    optionD: "Goblet cells",
    correctOption: "B",
    explanation:
      "Surfactant (primarily dipalmitoylphosphatidylcholine, DPPC) is produced by Type II alveolar pneumocytes (also called granular pneumocytes). Surfactant reduces surface tension in alveoli, preventing collapse during expiration. Deficiency causes NRDS in premature infants.",
  },
  {
    systemSlug: "respiratory-system",
    question: "The Bohr effect refers to:",
    optionA: "Increased O2 affinity of Hb at high altitude",
    optionB:
      "Decreased O2 affinity of Hb with increased CO2, H+, and temperature",
    optionC: "Increased CO2 transport when O2 is present",
    optionD: "Decreased CO2 affinity of Hb at high pH",
    correctOption: "B",
    explanation:
      "The Bohr effect describes the decrease in oxygen affinity of hemoglobin in response to increased CO2, decreased pH (increased H+), and increased temperature. This causes a rightward shift in the oxygen-hemoglobin dissociation curve, facilitating O2 release to tissues.",
  },
  // Digestive MCQs
  {
    systemSlug: "digestive-system",
    question: "Which enzyme converts pepsinogen to pepsin?",
    optionA: "Enterokinase",
    optionB: "Trypsin",
    optionC: "Hydrochloric acid (HCl)",
    optionD: "Salivary amylase",
    correctOption: "C",
    explanation:
      "Pepsinogen (inactive proenzyme) is converted to pepsin (active enzyme) by hydrochloric acid (HCl) secreted by parietal cells of the stomach. Pepsin itself can also activate pepsinogen (autocatalysis). Pepsin digests proteins at pH 1.5-3.5.",
  },
  {
    systemSlug: "digestive-system",
    question: "The primary site of nutrient absorption in the GI tract is:",
    optionA: "Stomach",
    optionB: "Duodenum only",
    optionC: "Small intestine (duodenum, jejunum, ileum)",
    optionD: "Large intestine",
    correctOption: "C",
    explanation:
      "The small intestine (particularly jejunum and ileum) is the primary site of nutrient absorption. Its surface area is vastly increased by plicae circulares (circular folds), villi, and microvilli (brush border), reaching approximately 250 m². The large intestine primarily absorbs water and electrolytes.",
  },
  {
    systemSlug: "digestive-system",
    question: "Bile is produced by which organ and stored where?",
    optionA: "Produced by gallbladder, stored in liver",
    optionB: "Produced by pancreas, stored in gallbladder",
    optionC: "Produced by liver, stored in gallbladder",
    optionD: "Produced by duodenum, stored in liver",
    correctOption: "C",
    explanation:
      "Bile is produced continuously by hepatocytes in the liver (500-1000 mL/day) and stored/concentrated in the gallbladder. Upon fat ingestion, CCK (cholecystokinin) triggers gallbladder contraction, releasing bile into the duodenum via the common bile duct to emulsify fats.",
  },
];

export const BLOG_POSTS_SEED = [
  {
    title: "Mastering the Cardiac Cycle: A NEET Preparation Guide",
    slug: "mastering-cardiac-cycle-neet-guide",
    content: `# Mastering the Cardiac Cycle: A NEET Preparation Guide

The cardiac cycle is one of the most frequently tested topics in NEET Biology. Understanding the sequence of events, volumes, and pressures involved will guarantee marks in this section.

## What is the Cardiac Cycle?

The cardiac cycle refers to the sequence of events in one heartbeat, from the beginning of one beat to the beginning of the next. In a healthy adult at rest, this cycle repeats approximately 72 times per minute.

**Duration:** One complete cycle ≈ 0.8 seconds
- Atrial systole: 0.1 seconds
- Ventricular systole: 0.3 seconds
- Complete diastole (joint diastole): 0.4 seconds

## Key Phases to Remember

### 1. Atrial Systole (0.1 sec)
- Both atria contract simultaneously
- Blood pushed into ventricles
- AV valves (mitral and tricuspid) are **open**
- Semilunar valves (aortic and pulmonary) are **closed**

### 2. Ventricular Systole (0.3 sec)
**Phase 1 - Isovolumetric Contraction:**
- Ventricular pressure rises but volume unchanged
- All valves temporarily closed
- "Isovolumetric" = same volume

**Phase 2 - Rapid Ejection:**
- Ventricular pressure exceeds aortic pressure
- Semilunar valves open
- ~70% of stroke volume ejected

**Phase 3 - Reduced Ejection:**
- Slower ejection of remaining volume
- Ventricular pressure begins to fall

### 3. Ventricular Diastole (0.5 sec)
**Phase 1 - Isovolumetric Relaxation:**
- All valves closed
- Ventricular pressure drops rapidly

**Phase 2 - Rapid Ventricular Filling:**
- Ventricular pressure falls below atrial pressure
- AV valves open
- Blood rushes in passively

**Phase 3 - Slow Ventricular Filling:**
- Gradual filling continues
- Accounts for ~80% of filling at rest

## Important Volumes (NEET Favourites)

| Volume | Value |
|--------|-------|
| End-Diastolic Volume (EDV) | ~120-130 mL |
| End-Systolic Volume (ESV) | ~50-60 mL |
| Stroke Volume (SV) = EDV - ESV | ~70 mL |
| Cardiac Output (CO) = SV × HR | ~5000 mL/min |

## Heart Sounds
- **S1 (lub):** Closure of AV valves at start of ventricular systole
- **S2 (dup):** Closure of semilunar valves at start of ventricular diastole
- S3 and S4 are abnormal sounds (murmurs)

## Quick Revision Points
✓ Cardiac output increases during exercise via Frank-Starling mechanism
✓ SA node fires at 60-100 bpm; AV node at 40-60 bpm; Purkinje fibers at 20-40 bpm
✓ ECG: P = atrial depolarization, QRS = ventricular depolarization, T = ventricular repolarization
✓ Blood pressure = Cardiac Output × Peripheral Resistance

Practice the MCQs in our Cardiovascular System section to reinforce these concepts!`,
    author: "Dr. Priya Sharma",
    isPublished: true,
  },
  {
    title:
      "Understanding Enzyme Kinetics for NEET: Digestive Enzymes Simplified",
    slug: "enzyme-kinetics-digestive-neet-simplified",
    content: `# Understanding Enzyme Kinetics for NEET: Digestive Enzymes Simplified

Enzyme-related questions appear in almost every NEET Biology paper. This guide breaks down the most important digestive enzymes with their sources, substrates, products, and optimal pH values.

## Why Enzymes Matter

Enzymes are biological catalysts that speed up chemical reactions without being consumed. In digestion, they break down macromolecules into absorbable monomers. For NEET, you need to know the **source, substrate, product, and pH** for each enzyme.

## The Complete Digestive Enzyme Chart

### Salivary Enzymes
| Enzyme | Source | Substrate | Product | pH |
|--------|--------|-----------|---------|-----|
| Salivary Amylase (Ptyalin) | Salivary glands | Starch | Maltose, Dextrin | 6.8-7.0 |
| Lingual lipase | Tongue | Fats | Fatty acids, glycerol | 4.0-4.5 |

### Gastric Enzymes
| Enzyme | Source | Substrate | Product | pH |
|--------|--------|-----------|---------|-----|
| Pepsin (from pepsinogen) | Chief cells | Proteins | Polypeptides | 1.5-3.5 |
| Rennin/Chymosin | Chief cells (infants) | Casein (milk) | Calcium paracaseinate | 3.5-4.0 |
| Gastric lipase | Chief cells | Fats | Fatty acids | 4.0-5.0 |

### Pancreatic Enzymes
| Enzyme | Source | Substrate | Product | pH |
|--------|--------|-----------|---------|-----|
| Pancreatic amylase | Pancreas | Starch | Maltose | 7.0-8.0 |
| Trypsin (from trypsinogen) | Pancreas | Proteins | Polypeptides | 7.0-8.0 |
| Chymotrypsin (from chymotrypsinogen) | Pancreas | Proteins | Polypeptides | 7.0-8.0 |
| Pancreatic lipase (Steapsin) | Pancreas | Fats | Fatty acids + Glycerol | 7.0-8.0 |
| Elastase | Pancreas | Elastin | Amino acids | 7.0-8.0 |

### Intestinal Brush Border Enzymes
| Enzyme | Source | Substrate | Product | pH |
|--------|--------|-----------|---------|-----|
| Enterokinase (Enteropeptidase) | Duodenal cells | Trypsinogen | Trypsin | 6.0-7.0 |
| Maltase | Intestinal mucosa | Maltose | Glucose | 5.8-6.2 |
| Sucrase | Intestinal mucosa | Sucrose | Glucose + Fructose | 5.0-7.0 |
| Lactase | Intestinal mucosa | Lactose | Glucose + Galactose | 6.0 |
| Peptidases | Intestinal mucosa | Dipeptides | Amino acids | 7.0-8.0 |

## Key Points for NEET

### Activation of Proenzymes
Many enzymes are secreted as inactive precursors (proenzymes/zymogens) to prevent autodigestion:
- **Pepsinogen** → Pepsin (by HCl)
- **Trypsinogen** → Trypsin (by Enterokinase)
- **Chymotrypsinogen** → Chymotrypsin (by Trypsin)
- **Proelastase** → Elastase (by Trypsin)

Enterokinase activates trypsinogen, and trypsin then activates all other pancreatic proenzymes. This is called the **cascade activation**.

### Fat Digestion is Special
Fats (triglycerides) are not water-soluble. Before lipases can act:
1. Bile emulsifies fat into tiny droplets (micelles)
2. This increases surface area for lipase action
3. End products: 2-monoglycerides + fatty acids → absorbed into lacteals

### Protein Digestion Summary
Proteins → (Pepsin, Trypsin, Chymotrypsin) → Polypeptides → (Peptidases) → Amino acids

### Carbohydrate Digestion Summary
Starch → (Amylase) → Maltose → (Maltase) → Glucose

## High-Yield NEET Facts
- Lactase deficiency → Lactose intolerance (bloating, diarrhea after dairy)
- Trypsin inhibitors in raw legumes — destroyed by cooking
- Enterokinase is not a digestive enzyme itself; it's a regulatory enzyme
- The human body secretes ~7L of digestive juices daily
- Rennin is found only in infants; absent or minimal in adults

Test your knowledge with our Digestive System MCQs section!`,
    author: "Dr. Arun Mehta",
    isPublished: true,
  },
];

export async function seedInitialData(actor: backendInterface): Promise<void> {
  try {
    const existing = await actor.getAllBodySystems();
    if (existing.length > 0) return; // Already seeded

    // Seed body systems
    for (const system of BODY_SYSTEMS_SEED) {
      await actor.createBodySystem(
        system.name,
        system.slug,
        system.description,
        system.structureText,
        system.functionText,
        system.neetPoints,
        system.commonDisorders,
        system.diagramUrl,
      );
    }

    // Fetch created systems to get their IDs
    const systems = await actor.getAllBodySystems();
    const systemIdMap = new Map<string, bigint>();
    for (const s of systems) {
      systemIdMap.set(s.slug, s.id);
    }

    // Seed MCQs
    for (const mcq of MCQ_SEED) {
      const systemId = systemIdMap.get(mcq.systemSlug);
      if (systemId !== undefined) {
        await actor.createMCQ(
          systemId,
          mcq.question,
          mcq.optionA,
          mcq.optionB,
          mcq.optionC,
          mcq.optionD,
          mcq.correctOption,
          mcq.explanation,
        );
      }
    }

    // Seed blog posts
    for (const post of BLOG_POSTS_SEED) {
      await actor.createBlogPost(
        post.title,
        post.slug,
        post.content,
        post.author,
        post.isPublished,
      );
    }
  } catch (err) {
    console.error("Seed failed:", err);
  }
}
