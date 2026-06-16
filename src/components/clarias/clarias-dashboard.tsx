// @ts-nocheck
import React, { useState, useMemo } from "react";
import {
  BarChart, Bar, LineChart, Line, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend,
} from "recharts";

// ---------------------------------------------------------------------------
// DATA
// ---------------------------------------------------------------------------
const MONTHS = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep"];
const DATA = {"cascade": {"combined": [{"cc": "CC-100", "ccName": "Facilities", "pc": "PC-CORP", "pcName": "Corporate Shared Services", "gl": "6010", "glName": "Facilities Management Services", "period": 1, "budget": 350000.0, "actual": 340334.15, "predicted": 339685.88}, {"cc": "CC-100", "ccName": "Facilities", "pc": "PC-CORP", "pcName": "Corporate Shared Services", "gl": "6010", "glName": "Facilities Management Services", "period": 2, "budget": 350000.0, "actual": 331535.27, "predicted": 332327.94}, {"cc": "CC-100", "ccName": "Facilities", "pc": "PC-CORP", "pcName": "Corporate Shared Services", "gl": "6010", "glName": "Facilities Management Services", "period": 3, "budget": 350000.0, "actual": 360839.64, "predicted": 366962.52}, {"cc": "CC-100", "ccName": "Facilities", "pc": "PC-CORP", "pcName": "Corporate Shared Services", "gl": "6010", "glName": "Facilities Management Services", "period": 4, "budget": 350000.0, "actual": 343636.03, "predicted": 343163.88}, {"cc": "CC-100", "ccName": "Facilities", "pc": "PC-CORP", "pcName": "Corporate Shared Services", "gl": "6010", "glName": "Facilities Management Services", "period": 5, "budget": 350000.0, "actual": 331068.87, "predicted": 331172.71}, {"cc": "CC-100", "ccName": "Facilities", "pc": "PC-CORP", "pcName": "Corporate Shared Services", "gl": "6010", "glName": "Facilities Management Services", "period": 6, "budget": 350000.0, "actual": 349404.89, "predicted": 350626.2}, {"cc": "CC-100", "ccName": "Facilities", "pc": "PC-CORP", "pcName": "Corporate Shared Services", "gl": "6010", "glName": "Facilities Management Services", "period": 7, "budget": 350000.0, "actual": 544065.0, "predicted": 350000.0}, {"cc": "CC-100", "ccName": "Facilities", "pc": "PC-CORP", "pcName": "Corporate Shared Services", "gl": "6010", "glName": "Facilities Management Services", "period": 8, "budget": 350000.0, "actual": 546900.0, "predicted": 538991.72}, {"cc": "CC-100", "ccName": "Facilities", "pc": "PC-CORP", "pcName": "Corporate Shared Services", "gl": "6010", "glName": "Facilities Management Services", "period": 9, "budget": 350000.0, "actual": 550680.0, "predicted": 548123.34}, {"cc": "CC-100", "ccName": "Facilities", "pc": "PC-CORP", "pcName": "Corporate Shared Services", "gl": "6020", "glName": "Utilities", "period": 1, "budget": 150000.0, "actual": 141698.74, "predicted": 142434.91}, {"cc": "CC-100", "ccName": "Facilities", "pc": "PC-CORP", "pcName": "Corporate Shared Services", "gl": "6020", "glName": "Utilities", "period": 2, "budget": 150000.0, "actual": 149110.29, "predicted": 150857.72}, {"cc": "CC-100", "ccName": "Facilities", "pc": "PC-CORP", "pcName": "Corporate Shared Services", "gl": "6020", "glName": "Utilities", "period": 3, "budget": 150000.0, "actual": 149216.17, "predicted": 146793.64}, {"cc": "CC-100", "ccName": "Facilities", "pc": "PC-CORP", "pcName": "Corporate Shared Services", "gl": "6020", "glName": "Utilities", "period": 4, "budget": 150000.0, "actual": 148446.22, "predicted": 147278.85}, {"cc": "CC-100", "ccName": "Facilities", "pc": "PC-CORP", "pcName": "Corporate Shared Services", "gl": "6020", "glName": "Utilities", "period": 5, "budget": 150000.0, "actual": 152915.69, "predicted": 150411.97}, {"cc": "CC-100", "ccName": "Facilities", "pc": "PC-CORP", "pcName": "Corporate Shared Services", "gl": "6020", "glName": "Utilities", "period": 6, "budget": 150000.0, "actual": 148877.95, "predicted": 150721.92}, {"cc": "CC-100", "ccName": "Facilities", "pc": "PC-CORP", "pcName": "Corporate Shared Services", "gl": "6020", "glName": "Utilities", "period": 7, "budget": 150000.0, "actual": 143474.43, "predicted": 144584.57}, {"cc": "CC-100", "ccName": "Facilities", "pc": "PC-CORP", "pcName": "Corporate Shared Services", "gl": "6020", "glName": "Utilities", "period": 8, "budget": 150000.0, "actual": 149595.39, "predicted": 146854.09}, {"cc": "CC-100", "ccName": "Facilities", "pc": "PC-CORP", "pcName": "Corporate Shared Services", "gl": "6020", "glName": "Utilities", "period": 9, "budget": 150000.0, "actual": 155170.22, "predicted": 158163.1}, {"cc": "CC-100", "ccName": "Facilities", "pc": "PC-CORP", "pcName": "Corporate Shared Services", "gl": "6030", "glName": "Building Maintenance", "period": 1, "budget": 45000.0, "actual": 46768.93, "predicted": 47638.38}, {"cc": "CC-100", "ccName": "Facilities", "pc": "PC-CORP", "pcName": "Corporate Shared Services", "gl": "6030", "glName": "Building Maintenance", "period": 2, "budget": 45000.0, "actual": 43056.22, "predicted": 43321.31}, {"cc": "CC-100", "ccName": "Facilities", "pc": "PC-CORP", "pcName": "Corporate Shared Services", "gl": "6030", "glName": "Building Maintenance", "period": 3, "budget": 45000.0, "actual": 45757.05, "predicted": 45968.56}, {"cc": "CC-100", "ccName": "Facilities", "pc": "PC-CORP", "pcName": "Corporate Shared Services", "gl": "6030", "glName": "Building Maintenance", "period": 4, "budget": 45000.0, "actual": 46425.68, "predicted": 45789.64}, {"cc": "CC-100", "ccName": "Facilities", "pc": "PC-CORP", "pcName": "Corporate Shared Services", "gl": "6030", "glName": "Building Maintenance", "period": 5, "budget": 45000.0, "actual": 46187.93, "predicted": 45291.89}, {"cc": "CC-100", "ccName": "Facilities", "pc": "PC-CORP", "pcName": "Corporate Shared Services", "gl": "6030", "glName": "Building Maintenance", "period": 6, "budget": 45000.0, "actual": 43092.98, "predicted": 43141.9}, {"cc": "CC-100", "ccName": "Facilities", "pc": "PC-CORP", "pcName": "Corporate Shared Services", "gl": "6030", "glName": "Building Maintenance", "period": 7, "budget": 45000.0, "actual": 46039.92, "predicted": 45228.79}, {"cc": "CC-100", "ccName": "Facilities", "pc": "PC-CORP", "pcName": "Corporate Shared Services", "gl": "6030", "glName": "Building Maintenance", "period": 8, "budget": 45000.0, "actual": 42955.54, "predicted": 42423.25}, {"cc": "CC-100", "ccName": "Facilities", "pc": "PC-CORP", "pcName": "Corporate Shared Services", "gl": "6030", "glName": "Building Maintenance", "period": 9, "budget": 45000.0, "actual": 46583.49, "predicted": 46102.64}, {"cc": "CC-200", "ccName": "Information Technology", "pc": "PC-CORP", "pcName": "Corporate Shared Services", "gl": "6110", "glName": "Software Subscriptions & Licensing", "period": 1, "budget": 113333.33, "actual": 104266.66, "predicted": 102306.79}, {"cc": "CC-200", "ccName": "Information Technology", "pc": "PC-CORP", "pcName": "Corporate Shared Services", "gl": "6110", "glName": "Software Subscriptions & Licensing", "period": 2, "budget": 113333.33, "actual": 104266.66, "predicted": 104116.24}, {"cc": "CC-200", "ccName": "Information Technology", "pc": "PC-CORP", "pcName": "Corporate Shared Services", "gl": "6110", "glName": "Software Subscriptions & Licensing", "period": 3, "budget": 113333.33, "actual": 104266.66, "predicted": 104018.64}, {"cc": "CC-200", "ccName": "Information Technology", "pc": "PC-CORP", "pcName": "Corporate Shared Services", "gl": "6110", "glName": "Software Subscriptions & Licensing", "period": 4, "budget": 113333.33, "actual": 104266.66, "predicted": 105694.81}, {"cc": "CC-200", "ccName": "Information Technology", "pc": "PC-CORP", "pcName": "Corporate Shared Services", "gl": "6110", "glName": "Software Subscriptions & Licensing", "period": 5, "budget": 113333.33, "actual": 104266.66, "predicted": 104346.42}, {"cc": "CC-200", "ccName": "Information Technology", "pc": "PC-CORP", "pcName": "Corporate Shared Services", "gl": "6110", "glName": "Software Subscriptions & Licensing", "period": 6, "budget": 113333.33, "actual": 104266.66, "predicted": 104851.77}, {"cc": "CC-200", "ccName": "Information Technology", "pc": "PC-CORP", "pcName": "Corporate Shared Services", "gl": "6110", "glName": "Software Subscriptions & Licensing", "period": 7, "budget": 113333.33, "actual": 417000.0, "predicted": 113333.33}, {"cc": "CC-200", "ccName": "Information Technology", "pc": "PC-CORP", "pcName": "Corporate Shared Services", "gl": "6110", "glName": "Software Subscriptions & Licensing", "period": 8, "budget": 113333.33, "actual": 156333.33, "predicted": 156331.91}, {"cc": "CC-200", "ccName": "Information Technology", "pc": "PC-CORP", "pcName": "Corporate Shared Services", "gl": "6110", "glName": "Software Subscriptions & Licensing", "period": 9, "budget": 113333.33, "actual": 156333.33, "predicted": 157349.18}, {"cc": "CC-200", "ccName": "Information Technology", "pc": "PC-CORP", "pcName": "Corporate Shared Services", "gl": "6120", "glName": "IT Hardware", "period": 1, "budget": 60000.0, "actual": 56804.09, "predicted": 56707.14}, {"cc": "CC-200", "ccName": "Information Technology", "pc": "PC-CORP", "pcName": "Corporate Shared Services", "gl": "6120", "glName": "IT Hardware", "period": 2, "budget": 60000.0, "actual": 58440.32, "predicted": 57921.75}, {"cc": "CC-200", "ccName": "Information Technology", "pc": "PC-CORP", "pcName": "Corporate Shared Services", "gl": "6120", "glName": "IT Hardware", "period": 3, "budget": 60000.0, "actual": 57307.59, "predicted": 58448.37}, {"cc": "CC-200", "ccName": "Information Technology", "pc": "PC-CORP", "pcName": "Corporate Shared Services", "gl": "6120", "glName": "IT Hardware", "period": 4, "budget": 60000.0, "actual": 56821.89, "predicted": 57948.54}, {"cc": "CC-200", "ccName": "Information Technology", "pc": "PC-CORP", "pcName": "Corporate Shared Services", "gl": "6120", "glName": "IT Hardware", "period": 5, "budget": 60000.0, "actual": 57913.54, "predicted": 58701.66}, {"cc": "CC-200", "ccName": "Information Technology", "pc": "PC-CORP", "pcName": "Corporate Shared Services", "gl": "6120", "glName": "IT Hardware", "period": 6, "budget": 60000.0, "actual": 59303.01, "predicted": 59795.96}, {"cc": "CC-200", "ccName": "Information Technology", "pc": "PC-CORP", "pcName": "Corporate Shared Services", "gl": "6120", "glName": "IT Hardware", "period": 7, "budget": 60000.0, "actual": 58455.81, "predicted": 58023.89}, {"cc": "CC-200", "ccName": "Information Technology", "pc": "PC-CORP", "pcName": "Corporate Shared Services", "gl": "6120", "glName": "IT Hardware", "period": 8, "budget": 60000.0, "actual": 57279.62, "predicted": 56660.23}, {"cc": "CC-200", "ccName": "Information Technology", "pc": "PC-CORP", "pcName": "Corporate Shared Services", "gl": "6120", "glName": "IT Hardware", "period": 9, "budget": 60000.0, "actual": 60577.18, "predicted": 60066.01}, {"cc": "CC-200", "ccName": "Information Technology", "pc": "PC-CORP", "pcName": "Corporate Shared Services", "gl": "6130", "glName": "IT Support Services", "period": 1, "budget": 50000.0, "actual": 50895.28, "predicted": 50020.34}, {"cc": "CC-200", "ccName": "Information Technology", "pc": "PC-CORP", "pcName": "Corporate Shared Services", "gl": "6130", "glName": "IT Support Services", "period": 2, "budget": 50000.0, "actual": 47999.59, "predicted": 48510.86}, {"cc": "CC-200", "ccName": "Information Technology", "pc": "PC-CORP", "pcName": "Corporate Shared Services", "gl": "6130", "glName": "IT Support Services", "period": 3, "budget": 50000.0, "actual": 50462.61, "predicted": 50261.57}, {"cc": "CC-200", "ccName": "Information Technology", "pc": "PC-CORP", "pcName": "Corporate Shared Services", "gl": "6130", "glName": "IT Support Services", "period": 4, "budget": 50000.0, "actual": 49350.4, "predicted": 50034.56}, {"cc": "CC-200", "ccName": "Information Technology", "pc": "PC-CORP", "pcName": "Corporate Shared Services", "gl": "6130", "glName": "IT Support Services", "period": 5, "budget": 50000.0, "actual": 47423.89, "predicted": 47208.61}, {"cc": "CC-200", "ccName": "Information Technology", "pc": "PC-CORP", "pcName": "Corporate Shared Services", "gl": "6130", "glName": "IT Support Services", "period": 6, "budget": 50000.0, "actual": 50750.7, "predicted": 51680.54}, {"cc": "CC-200", "ccName": "Information Technology", "pc": "PC-CORP", "pcName": "Corporate Shared Services", "gl": "6130", "glName": "IT Support Services", "period": 7, "budget": 50000.0, "actual": 48979.19, "predicted": 49659.63}, {"cc": "CC-200", "ccName": "Information Technology", "pc": "PC-CORP", "pcName": "Corporate Shared Services", "gl": "6130", "glName": "IT Support Services", "period": 8, "budget": 50000.0, "actual": 47755.75, "predicted": 46801.68}, {"cc": "CC-200", "ccName": "Information Technology", "pc": "PC-CORP", "pcName": "Corporate Shared Services", "gl": "6130", "glName": "IT Support Services", "period": 9, "budget": 50000.0, "actual": 47779.56, "predicted": 47224.78}, {"cc": "CC-300", "ccName": "Pharmacy", "pc": "PC-INPT", "pcName": "Inpatient Care", "gl": "6210", "glName": "Pharmaceutical Supplies", "period": 1, "budget": 433333.33, "actual": 435485.9, "predicted": 442632.61}, {"cc": "CC-300", "ccName": "Pharmacy", "pc": "PC-INPT", "pcName": "Inpatient Care", "gl": "6210", "glName": "Pharmaceutical Supplies", "period": 2, "budget": 433333.33, "actual": 443133.39, "predicted": 442601.4}, {"cc": "CC-300", "ccName": "Pharmacy", "pc": "PC-INPT", "pcName": "Inpatient Care", "gl": "6210", "glName": "Pharmaceutical Supplies", "period": 3, "budget": 433333.33, "actual": 420028.55, "predicted": 428099.13}, {"cc": "CC-300", "ccName": "Pharmacy", "pc": "PC-INPT", "pcName": "Inpatient Care", "gl": "6210", "glName": "Pharmaceutical Supplies", "period": 4, "budget": 433333.33, "actual": 425490.54, "predicted": 423744.74}, {"cc": "CC-300", "ccName": "Pharmacy", "pc": "PC-INPT", "pcName": "Inpatient Care", "gl": "6210", "glName": "Pharmaceutical Supplies", "period": 5, "budget": 433333.33, "actual": 446233.84, "predicted": 438612.85}, {"cc": "CC-300", "ccName": "Pharmacy", "pc": "PC-INPT", "pcName": "Inpatient Care", "gl": "6210", "glName": "Pharmaceutical Supplies", "period": 6, "budget": 433333.33, "actual": 440981.93, "predicted": 443265.42}, {"cc": "CC-300", "ccName": "Pharmacy", "pc": "PC-INPT", "pcName": "Inpatient Care", "gl": "6210", "glName": "Pharmaceutical Supplies", "period": 7, "budget": 433333.33, "actual": 427851.36, "predicted": 432617.81}, {"cc": "CC-300", "ccName": "Pharmacy", "pc": "PC-INPT", "pcName": "Inpatient Care", "gl": "6210", "glName": "Pharmaceutical Supplies", "period": 8, "budget": 433333.33, "actual": 429795.11, "predicted": 425837.14}, {"cc": "CC-300", "ccName": "Pharmacy", "pc": "PC-INPT", "pcName": "Inpatient Care", "gl": "6210", "glName": "Pharmaceutical Supplies", "period": 9, "budget": 433333.33, "actual": 409161.95, "predicted": 402404.95}, {"cc": "CC-300", "ccName": "Pharmacy", "pc": "PC-INPT", "pcName": "Inpatient Care", "gl": "6220", "glName": "Pharmacy Equipment", "period": 1, "budget": 30000.0, "actual": 30479.98, "predicted": 30275.87}, {"cc": "CC-300", "ccName": "Pharmacy", "pc": "PC-INPT", "pcName": "Inpatient Care", "gl": "6220", "glName": "Pharmacy Equipment", "period": 2, "budget": 30000.0, "actual": 31120.08, "predicted": 31697.76}, {"cc": "CC-300", "ccName": "Pharmacy", "pc": "PC-INPT", "pcName": "Inpatient Care", "gl": "6220", "glName": "Pharmacy Equipment", "period": 3, "budget": 30000.0, "actual": 29799.86, "predicted": 30107.44}, {"cc": "CC-300", "ccName": "Pharmacy", "pc": "PC-INPT", "pcName": "Inpatient Care", "gl": "6220", "glName": "Pharmacy Equipment", "period": 4, "budget": 30000.0, "actual": 30720.0, "predicted": 30250.59}, {"cc": "CC-300", "ccName": "Pharmacy", "pc": "PC-INPT", "pcName": "Inpatient Care", "gl": "6220", "glName": "Pharmacy Equipment", "period": 5, "budget": 30000.0, "actual": 29526.35, "predicted": 29226.82}, {"cc": "CC-300", "ccName": "Pharmacy", "pc": "PC-INPT", "pcName": "Inpatient Care", "gl": "6220", "glName": "Pharmacy Equipment", "period": 6, "budget": 30000.0, "actual": 28838.07, "predicted": 28377.87}, {"cc": "CC-300", "ccName": "Pharmacy", "pc": "PC-INPT", "pcName": "Inpatient Care", "gl": "6220", "glName": "Pharmacy Equipment", "period": 7, "budget": 30000.0, "actual": 30848.5, "predicted": 30305.43}, {"cc": "CC-300", "ccName": "Pharmacy", "pc": "PC-INPT", "pcName": "Inpatient Care", "gl": "6220", "glName": "Pharmacy Equipment", "period": 8, "budget": 30000.0, "actual": 28684.39, "predicted": 29025.19}, {"cc": "CC-300", "ccName": "Pharmacy", "pc": "PC-INPT", "pcName": "Inpatient Care", "gl": "6220", "glName": "Pharmacy Equipment", "period": 9, "budget": 30000.0, "actual": 28476.58, "predicted": 28109.44}, {"cc": "CC-400", "ccName": "Nursing Operations", "pc": "PC-INPT", "pcName": "Inpatient Care", "gl": "6310", "glName": "Medical/Surgical Supplies", "period": 1, "budget": 233333.33, "actual": 231406.79, "predicted": 231955.64}, {"cc": "CC-400", "ccName": "Nursing Operations", "pc": "PC-INPT", "pcName": "Inpatient Care", "gl": "6310", "glName": "Medical/Surgical Supplies", "period": 2, "budget": 233333.33, "actual": 225678.14, "predicted": 225203.54}, {"cc": "CC-400", "ccName": "Nursing Operations", "pc": "PC-INPT", "pcName": "Inpatient Care", "gl": "6310", "glName": "Medical/Surgical Supplies", "period": 3, "budget": 233333.33, "actual": 238461.47, "predicted": 235511.08}, {"cc": "CC-400", "ccName": "Nursing Operations", "pc": "PC-INPT", "pcName": "Inpatient Care", "gl": "6310", "glName": "Medical/Surgical Supplies", "period": 4, "budget": 233333.33, "actual": 237990.37, "predicted": 240197.91}, {"cc": "CC-400", "ccName": "Nursing Operations", "pc": "PC-INPT", "pcName": "Inpatient Care", "gl": "6310", "glName": "Medical/Surgical Supplies", "period": 5, "budget": 233333.33, "actual": 241228.16, "predicted": 237667.31}, {"cc": "CC-400", "ccName": "Nursing Operations", "pc": "PC-INPT", "pcName": "Inpatient Care", "gl": "6310", "glName": "Medical/Surgical Supplies", "period": 6, "budget": 233333.33, "actual": 239312.0, "predicted": 240687.71}, {"cc": "CC-400", "ccName": "Nursing Operations", "pc": "PC-INPT", "pcName": "Inpatient Care", "gl": "6310", "glName": "Medical/Surgical Supplies", "period": 7, "budget": 233333.33, "actual": 229921.38, "predicted": 226394.46}, {"cc": "CC-400", "ccName": "Nursing Operations", "pc": "PC-INPT", "pcName": "Inpatient Care", "gl": "6310", "glName": "Medical/Surgical Supplies", "period": 8, "budget": 233333.33, "actual": 233333.33, "predicted": 233333.33}, {"cc": "CC-400", "ccName": "Nursing Operations", "pc": "PC-INPT", "pcName": "Inpatient Care", "gl": "6310", "glName": "Medical/Surgical Supplies", "period": 9, "budget": 233333.33, "actual": 235889.19, "predicted": 235141.47}, {"cc": "CC-400", "ccName": "Nursing Operations", "pc": "PC-INPT", "pcName": "Inpatient Care", "gl": "6320", "glName": "Clinical Contract Staffing", "period": 1, "budget": 91666.67, "actual": 87827.17, "predicted": 86818.44}, {"cc": "CC-400", "ccName": "Nursing Operations", "pc": "PC-INPT", "pcName": "Inpatient Care", "gl": "6320", "glName": "Clinical Contract Staffing", "period": 2, "budget": 91666.67, "actual": 93533.72, "predicted": 92672.44}, {"cc": "CC-400", "ccName": "Nursing Operations", "pc": "PC-INPT", "pcName": "Inpatient Care", "gl": "6320", "glName": "Clinical Contract Staffing", "period": 3, "budget": 91666.67, "actual": 88418.74, "predicted": 90084.3}, {"cc": "CC-400", "ccName": "Nursing Operations", "pc": "PC-INPT", "pcName": "Inpatient Care", "gl": "6320", "glName": "Clinical Contract Staffing", "period": 4, "budget": 91666.67, "actual": 92470.97, "predicted": 93593.24}, {"cc": "CC-400", "ccName": "Nursing Operations", "pc": "PC-INPT", "pcName": "Inpatient Care", "gl": "6320", "glName": "Clinical Contract Staffing", "period": 5, "budget": 91666.67, "actual": 92847.74, "predicted": 92120.35}, {"cc": "CC-400", "ccName": "Nursing Operations", "pc": "PC-INPT", "pcName": "Inpatient Care", "gl": "6320", "glName": "Clinical Contract Staffing", "period": 6, "budget": 91666.67, "actual": 93839.06, "predicted": 95283.68}, {"cc": "CC-400", "ccName": "Nursing Operations", "pc": "PC-INPT", "pcName": "Inpatient Care", "gl": "6320", "glName": "Clinical Contract Staffing", "period": 7, "budget": 91666.67, "actual": 94232.0, "predicted": 93141.59}, {"cc": "CC-400", "ccName": "Nursing Operations", "pc": "PC-INPT", "pcName": "Inpatient Care", "gl": "6320", "glName": "Clinical Contract Staffing", "period": 8, "budget": 91666.67, "actual": 92516.29, "predicted": 92125.04}, {"cc": "CC-400", "ccName": "Nursing Operations", "pc": "PC-INPT", "pcName": "Inpatient Care", "gl": "6320", "glName": "Clinical Contract Staffing", "period": 9, "budget": 91666.67, "actual": 88632.84, "predicted": 89889.22}, {"cc": "CC-500", "ccName": "Supply Chain", "pc": "PC-OUTPT", "pcName": "Outpatient Clinics", "gl": "6410", "glName": "General Supplies", "period": 1, "budget": 40000.0, "actual": 41490.49, "predicted": 41725.88}, {"cc": "CC-500", "ccName": "Supply Chain", "pc": "PC-OUTPT", "pcName": "Outpatient Clinics", "gl": "6410", "glName": "General Supplies", "period": 2, "budget": 40000.0, "actual": 39126.51, "predicted": 38501.01}, {"cc": "CC-500", "ccName": "Supply Chain", "pc": "PC-OUTPT", "pcName": "Outpatient Clinics", "gl": "6410", "glName": "General Supplies", "period": 3, "budget": 40000.0, "actual": 40868.18, "predicted": 41668.05}, {"cc": "CC-500", "ccName": "Supply Chain", "pc": "PC-OUTPT", "pcName": "Outpatient Clinics", "gl": "6410", "glName": "General Supplies", "period": 4, "budget": 40000.0, "actual": 39175.92, "predicted": 38726.56}, {"cc": "CC-500", "ccName": "Supply Chain", "pc": "PC-OUTPT", "pcName": "Outpatient Clinics", "gl": "6410", "glName": "General Supplies", "period": 5, "budget": 40000.0, "actual": 40736.17, "predicted": 40342.3}, {"cc": "CC-500", "ccName": "Supply Chain", "pc": "PC-OUTPT", "pcName": "Outpatient Clinics", "gl": "6410", "glName": "General Supplies", "period": 6, "budget": 40000.0, "actual": 41167.77, "predicted": 41616.81}, {"cc": "CC-500", "ccName": "Supply Chain", "pc": "PC-OUTPT", "pcName": "Outpatient Clinics", "gl": "6410", "glName": "General Supplies", "period": 7, "budget": 40000.0, "actual": 39936.25, "predicted": 39663.01}, {"cc": "CC-500", "ccName": "Supply Chain", "pc": "PC-OUTPT", "pcName": "Outpatient Clinics", "gl": "6410", "glName": "General Supplies", "period": 8, "budget": 40000.0, "actual": 38132.37, "predicted": 37821.71}, {"cc": "CC-500", "ccName": "Supply Chain", "pc": "PC-OUTPT", "pcName": "Outpatient Clinics", "gl": "6410", "glName": "General Supplies", "period": 9, "budget": 40000.0, "actual": 40104.91, "predicted": 39420.56}, {"cc": "CC-500", "ccName": "Supply Chain", "pc": "PC-OUTPT", "pcName": "Outpatient Clinics", "gl": "6420", "glName": "Logistics & Distribution", "period": 1, "budget": 32500.0, "actual": 32035.08, "predicted": 31509.85}, {"cc": "CC-500", "ccName": "Supply Chain", "pc": "PC-OUTPT", "pcName": "Outpatient Clinics", "gl": "6420", "glName": "Logistics & Distribution", "period": 2, "budget": 32500.0, "actual": 30764.67, "predicted": 30866.48}, {"cc": "CC-500", "ccName": "Supply Chain", "pc": "PC-OUTPT", "pcName": "Outpatient Clinics", "gl": "6420", "glName": "Logistics & Distribution", "period": 3, "budget": 32500.0, "actual": 31216.96, "predicted": 30896.07}, {"cc": "CC-500", "ccName": "Supply Chain", "pc": "PC-OUTPT", "pcName": "Outpatient Clinics", "gl": "6420", "glName": "Logistics & Distribution", "period": 4, "budget": 32500.0, "actual": 32555.17, "predicted": 32687.06}, {"cc": "CC-500", "ccName": "Supply Chain", "pc": "PC-OUTPT", "pcName": "Outpatient Clinics", "gl": "6420", "glName": "Logistics & Distribution", "period": 5, "budget": 32500.0, "actual": 31628.26, "predicted": 31465.95}, {"cc": "CC-500", "ccName": "Supply Chain", "pc": "PC-OUTPT", "pcName": "Outpatient Clinics", "gl": "6420", "glName": "Logistics & Distribution", "period": 6, "budget": 32500.0, "actual": 33710.65, "predicted": 33647.55}, {"cc": "CC-500", "ccName": "Supply Chain", "pc": "PC-OUTPT", "pcName": "Outpatient Clinics", "gl": "6420", "glName": "Logistics & Distribution", "period": 7, "budget": 32500.0, "actual": 31495.28, "predicted": 32073.7}, {"cc": "CC-500", "ccName": "Supply Chain", "pc": "PC-OUTPT", "pcName": "Outpatient Clinics", "gl": "6420", "glName": "Logistics & Distribution", "period": 8, "budget": 32500.0, "actual": 33592.83, "predicted": 33570.96}, {"cc": "CC-500", "ccName": "Supply Chain", "pc": "PC-OUTPT", "pcName": "Outpatient Clinics", "gl": "6420", "glName": "Logistics & Distribution", "period": 9, "budget": 32500.0, "actual": 33214.66, "predicted": 33313.73}, {"cc": "CC-600", "ccName": "Administration", "pc": "PC-CORP", "pcName": "Corporate Shared Services", "gl": "6510", "glName": "Legal & Professional Services", "period": 1, "budget": 55000.0, "actual": 52479.57, "predicted": 53248.97}, {"cc": "CC-600", "ccName": "Administration", "pc": "PC-CORP", "pcName": "Corporate Shared Services", "gl": "6510", "glName": "Legal & Professional Services", "period": 2, "budget": 55000.0, "actual": 53708.54, "predicted": 53027.15}, {"cc": "CC-600", "ccName": "Administration", "pc": "PC-CORP", "pcName": "Corporate Shared Services", "gl": "6510", "glName": "Legal & Professional Services", "period": 3, "budget": 55000.0, "actual": 55448.73, "predicted": 54681.62}, {"cc": "CC-600", "ccName": "Administration", "pc": "PC-CORP", "pcName": "Corporate Shared Services", "gl": "6510", "glName": "Legal & Professional Services", "period": 4, "budget": 55000.0, "actual": 56321.27, "predicted": 57241.39}, {"cc": "CC-600", "ccName": "Administration", "pc": "PC-CORP", "pcName": "Corporate Shared Services", "gl": "6510", "glName": "Legal & Professional Services", "period": 5, "budget": 55000.0, "actual": 56315.11, "predicted": 57030.99}, {"cc": "CC-600", "ccName": "Administration", "pc": "PC-CORP", "pcName": "Corporate Shared Services", "gl": "6510", "glName": "Legal & Professional Services", "period": 6, "budget": 55000.0, "actual": 56658.62, "predicted": 56090.9}, {"cc": "CC-600", "ccName": "Administration", "pc": "PC-CORP", "pcName": "Corporate Shared Services", "gl": "6510", "glName": "Legal & Professional Services", "period": 7, "budget": 55000.0, "actual": 55856.11, "predicted": 55163.05}, {"cc": "CC-600", "ccName": "Administration", "pc": "PC-CORP", "pcName": "Corporate Shared Services", "gl": "6510", "glName": "Legal & Professional Services", "period": 8, "budget": 55000.0, "actual": 56290.72, "predicted": 56829.81}, {"cc": "CC-600", "ccName": "Administration", "pc": "PC-CORP", "pcName": "Corporate Shared Services", "gl": "6510", "glName": "Legal & Professional Services", "period": 9, "budget": 55000.0, "actual": 52744.17, "predicted": 53673.32}, {"cc": "CC-600", "ccName": "Administration", "pc": "PC-CORP", "pcName": "Corporate Shared Services", "gl": "6520", "glName": "Office & Admin Supplies", "period": 1, "budget": 15000.0, "actual": 14405.15, "predicted": 14230.32}, {"cc": "CC-600", "ccName": "Administration", "pc": "PC-CORP", "pcName": "Corporate Shared Services", "gl": "6520", "glName": "Office & Admin Supplies", "period": 2, "budget": 15000.0, "actual": 14776.29, "predicted": 15042.34}, {"cc": "CC-600", "ccName": "Administration", "pc": "PC-CORP", "pcName": "Corporate Shared Services", "gl": "6520", "glName": "Office & Admin Supplies", "period": 3, "budget": 15000.0, "actual": 15467.86, "predicted": 15704.33}, {"cc": "CC-600", "ccName": "Administration", "pc": "PC-CORP", "pcName": "Corporate Shared Services", "gl": "6520", "glName": "Office & Admin Supplies", "period": 4, "budget": 15000.0, "actual": 14615.5, "predicted": 14676.03}, {"cc": "CC-600", "ccName": "Administration", "pc": "PC-CORP", "pcName": "Corporate Shared Services", "gl": "6520", "glName": "Office & Admin Supplies", "period": 5, "budget": 15000.0, "actual": 14935.99, "predicted": 14889.07}, {"cc": "CC-600", "ccName": "Administration", "pc": "PC-CORP", "pcName": "Corporate Shared Services", "gl": "6520", "glName": "Office & Admin Supplies", "period": 6, "budget": 15000.0, "actual": 14779.48, "predicted": 14545.28}, {"cc": "CC-600", "ccName": "Administration", "pc": "PC-CORP", "pcName": "Corporate Shared Services", "gl": "6520", "glName": "Office & Admin Supplies", "period": 7, "budget": 15000.0, "actual": 14362.04, "predicted": 14097.03}, {"cc": "CC-600", "ccName": "Administration", "pc": "PC-CORP", "pcName": "Corporate Shared Services", "gl": "6520", "glName": "Office & Admin Supplies", "period": 8, "budget": 15000.0, "actual": 14487.54, "predicted": 14755.66}, {"cc": "CC-600", "ccName": "Administration", "pc": "PC-CORP", "pcName": "Corporate Shared Services", "gl": "6520", "glName": "Office & Admin Supplies", "period": 9, "budget": 15000.0, "actual": 14674.26, "predicted": 14520.71}], "vendors": [{"name": "Sterling Facilities Group", "total": 5775828.85, "invoices": 18}, {"name": "Harborview Pharma Distribution", "total": 4146656.38, "invoices": 25}, {"name": "Meridian Medical Supply", "total": 2078220.83, "invoices": 12}, {"name": "BlueRiver Utilities Co", "total": 1338505.1, "invoices": 15}, {"name": "Apex Staffing Partners", "total": 1265715.5, "invoices": 29}, {"name": "Northgate Software Solutions", "total": 1175266.62, "invoices": 10}, {"name": "Crestline Office Supply", "total": 783456.24, "invoices": 41}, {"name": "Pacific Crest IT Solutions", "total": 522903.05, "invoices": 12}, {"name": "Lakeside Legal Group", "total": 495822.84, "invoices": 15}, {"name": "Granite Builders & Maintenance Co", "total": 406867.74, "invoices": 14}, {"name": "Quickline IT Supplies", "total": 180000.0, "invoices": 3}, {"name": "QuickMed Retail", "total": 35000.0, "invoices": 1}], "contracts": [{"contract_id": "C-201", "vendor_name": "Sterling Facilities Group", "vendor_ein": "12-3456789", "contract_name": "Facilities Management Services Agreement", "category": "Facilities Management Services", "cost_center_code": "CC-100", "profit_center_code": "PC-CORP", "gl_code": "6010", "start_date": "2025-01-01", "end_date": "2027-12-31", "contracted_terms": "$185.00 per labor hour", "annual_value_estimate": "4200000", "renewal_notice_days": "90", "auto_renew": "No", "notes": "Amended June 2026 to add 24/7 HVAC monitoring across East/West wing additions (approved scope expansion)."}, {"contract_id": "C-110", "vendor_name": "BlueRiver Utilities Co", "vendor_ein": "78-9012345", "contract_name": "Utilities Supply Agreement", "category": "Utilities", "cost_center_code": "CC-100", "profit_center_code": "PC-CORP", "gl_code": "6020", "start_date": "2024-01-01", "end_date": "2028-12-31", "contracted_terms": "Market rate, no fixed unit price", "annual_value_estimate": "1800000", "renewal_notice_days": "180", "auto_renew": "Yes", "notes": ""}, {"contract_id": "C-150", "vendor_name": "Northgate Software Solutions", "vendor_ein": "23-4567890", "contract_name": "Enterprise Software License Agreement", "category": "Software Subscriptions & Licensing", "cost_center_code": "CC-200", "profit_center_code": "PC-CORP", "gl_code": "6110", "start_date": "2025-07-01", "end_date": "2027-06-30", "contracted_terms": "$340,000 per annual license term, billed annually in July", "annual_value_estimate": "340000", "renewal_notice_days": "60", "auto_renew": "Yes", "notes": "Annual renewal billed as a single lump sum each July; budget spread evenly across 12 months (prepaid amortization mismatch)."}, {"contract_id": "C-160", "vendor_name": "Apex Staffing Partners", "vendor_ein": "67-8901234", "contract_name": "IT Support & Clinical Staffing Agreement", "category": "Contract Staffing", "cost_center_code": "CC-200", "profit_center_code": "PC-CORP", "gl_code": "6130", "start_date": "2025-03-01", "end_date": "2027-02-28", "contracted_terms": "$95.00 per support hour", "annual_value_estimate": "600000", "renewal_notice_days": "60", "auto_renew": "Yes", "notes": ""}, {"contract_id": "C-305", "vendor_name": "Meridian Medical Supply", "vendor_ein": "45-6789012", "contract_name": "Medical/Surgical Supply GPO Agreement", "category": "Medical/Surgical Supplies", "cost_center_code": "CC-400", "profit_center_code": "PC-INPT", "gl_code": "6310", "start_date": "2023-11-16", "end_date": "2026-11-15", "contracted_terms": "GPO contracted pricing schedule", "annual_value_estimate": "2800000", "renewal_notice_days": "60", "auto_renew": "No", "notes": "Renewal notice deadline (60 days prior) was Sept 16, 2026 - no renewal or replacement RFP initiated. Separately, an August national glove/syringe shortage caused partial fulfillment, leading to off-contract (maverick) purchases from QuickMed Retail."}, {"contract_id": "C-330", "vendor_name": "Harborview Pharma Distribution", "vendor_ein": "56-7890123", "contract_name": "Pharmaceutical Distribution Agreement", "category": "Pharmaceutical Supplies", "cost_center_code": "CC-300", "profit_center_code": "PC-INPT", "gl_code": "6210", "start_date": "2024-06-01", "end_date": "2027-05-31", "contracted_terms": "Formulary pricing schedule", "annual_value_estimate": "5200000", "renewal_notice_days": "120", "auto_renew": "Yes", "notes": ""}], "forecast": [{"cc": "CC-100", "ccName": "Facilities", "gl": "6010", "glName": "Facilities Management Services", "ytdActual": 3698463.85, "annualBudget": 4200000.0, "runRateMonthly": 547215.0, "projectedQ4": 1641645.0, "projectedFY": 5340108.85, "projectedVariance": 1140108.85, "hasOneTimeAnomaly": false, "anomalyMonth": null, "adjRunRateMonthly": 547215.0, "adjProjectedQ4": 1641645.0, "adjProjectedFY": 5340108.85, "adjProjectedVariance": 1140108.85}, {"cc": "CC-100", "ccName": "Facilities", "gl": "6020", "glName": "Utilities", "ytdActual": 1338505.1, "annualBudget": 1800000.0, "runRateMonthly": 149413.35, "projectedQ4": 448240.04, "projectedFY": 1786745.14, "projectedVariance": -13254.86, "hasOneTimeAnomaly": false, "anomalyMonth": null, "adjRunRateMonthly": 149413.35, "adjProjectedQ4": 448240.04, "adjProjectedFY": 1786745.14, "adjProjectedVariance": -13254.86}, {"cc": "CC-100", "ccName": "Facilities", "gl": "6030", "glName": "Building Maintenance", "ytdActual": 406867.74, "annualBudget": 540000.0, "runRateMonthly": 45192.98, "projectedQ4": 135578.95, "projectedFY": 542446.69, "projectedVariance": 2446.69, "hasOneTimeAnomaly": false, "anomalyMonth": null, "adjRunRateMonthly": 45192.98, "adjProjectedQ4": 135578.95, "adjProjectedFY": 542446.69, "adjProjectedVariance": 2446.69}, {"cc": "CC-200", "ccName": "Information Technology", "gl": "6110", "glName": "Software Subscriptions & Licensing", "ytdActual": 1355266.62, "annualBudget": 1359999.96, "runRateMonthly": 243222.22, "projectedQ4": 729666.66, "projectedFY": 2084933.28, "projectedVariance": 724933.32, "hasOneTimeAnomaly": true, "anomalyMonth": 7, "adjRunRateMonthly": 156333.33, "adjProjectedQ4": 468999.99, "adjProjectedFY": 1824266.61, "adjProjectedVariance": 464266.65}, {"cc": "CC-200", "ccName": "Information Technology", "gl": "6120", "glName": "IT Hardware", "ytdActual": 522903.05, "annualBudget": 720000.0, "runRateMonthly": 58770.87, "projectedQ4": 176312.61, "projectedFY": 699215.66, "projectedVariance": -20784.34, "hasOneTimeAnomaly": false, "anomalyMonth": null, "adjRunRateMonthly": 58770.87, "adjProjectedQ4": 176312.61, "adjProjectedFY": 699215.66, "adjProjectedVariance": -20784.34}, {"cc": "CC-200", "ccName": "Information Technology", "gl": "6130", "glName": "IT Support Services", "ytdActual": 441396.97, "annualBudget": 600000.0, "runRateMonthly": 48171.5, "projectedQ4": 144514.5, "projectedFY": 585911.47, "projectedVariance": -14088.53, "hasOneTimeAnomaly": false, "anomalyMonth": null, "adjRunRateMonthly": 48171.5, "adjProjectedQ4": 144514.5, "adjProjectedFY": 585911.47, "adjProjectedVariance": -14088.53}, {"cc": "CC-300", "ccName": "Pharmacy", "gl": "6210", "glName": "Pharmaceutical Supplies", "ytdActual": 3878162.57, "annualBudget": 5199999.96, "runRateMonthly": 422269.47, "projectedQ4": 1266808.42, "projectedFY": 5144970.99, "projectedVariance": -55028.97, "hasOneTimeAnomaly": false, "anomalyMonth": null, "adjRunRateMonthly": 422269.47, "adjProjectedQ4": 1266808.42, "adjProjectedFY": 5144970.99, "adjProjectedVariance": -55028.97}, {"cc": "CC-300", "ccName": "Pharmacy", "gl": "6220", "glName": "Pharmacy Equipment", "ytdActual": 268493.81, "annualBudget": 360000.0, "runRateMonthly": 29336.49, "projectedQ4": 88009.47, "projectedFY": 356503.28, "projectedVariance": -3496.72, "hasOneTimeAnomaly": false, "anomalyMonth": null, "adjRunRateMonthly": 29336.49, "adjProjectedQ4": 88009.47, "adjProjectedFY": 356503.28, "adjProjectedVariance": -3496.72}, {"cc": "CC-400", "ccName": "Nursing Operations", "gl": "6310", "glName": "Medical/Surgical Supplies", "ytdActual": 2113220.83, "annualBudget": 2799999.96, "runRateMonthly": 233047.97, "projectedQ4": 699143.9, "projectedFY": 2812364.73, "projectedVariance": 12364.77, "hasOneTimeAnomaly": true, "anomalyMonth": 8, "adjRunRateMonthly": 232905.29, "adjProjectedQ4": 698715.85, "adjProjectedFY": 2811936.68, "adjProjectedVariance": 11936.72}, {"cc": "CC-400", "ccName": "Nursing Operations", "gl": "6320", "glName": "Clinical Contract Staffing", "ytdActual": 824318.53, "annualBudget": 1100000.04, "runRateMonthly": 91793.71, "projectedQ4": 275381.13, "projectedFY": 1099699.66, "projectedVariance": -300.38, "hasOneTimeAnomaly": false, "anomalyMonth": null, "adjRunRateMonthly": 91793.71, "adjProjectedQ4": 275381.13, "adjProjectedFY": 1099699.66, "adjProjectedVariance": -300.38}, {"cc": "CC-500", "ccName": "Supply Chain", "gl": "6410", "glName": "General Supplies", "ytdActual": 360738.57, "annualBudget": 480000.0, "runRateMonthly": 39391.18, "projectedQ4": 118173.53, "projectedFY": 478912.1, "projectedVariance": -1087.9, "hasOneTimeAnomaly": false, "anomalyMonth": null, "adjRunRateMonthly": 39391.18, "adjProjectedQ4": 118173.53, "adjProjectedFY": 478912.1, "adjProjectedVariance": -1087.9}, {"cc": "CC-500", "ccName": "Supply Chain", "gl": "6420", "glName": "Logistics & Distribution", "ytdActual": 290213.56, "annualBudget": 390000.0, "runRateMonthly": 32767.59, "projectedQ4": 98302.77, "projectedFY": 388516.33, "projectedVariance": -1483.67, "hasOneTimeAnomaly": false, "anomalyMonth": null, "adjRunRateMonthly": 32767.59, "adjProjectedQ4": 98302.77, "adjProjectedFY": 388516.33, "adjProjectedVariance": -1483.67}, {"cc": "CC-600", "ccName": "Administration", "gl": "6510", "glName": "Legal & Professional Services", "ytdActual": 495822.84, "annualBudget": 660000.0, "runRateMonthly": 54963.67, "projectedQ4": 164891.0, "projectedFY": 660713.84, "projectedVariance": 713.84, "hasOneTimeAnomaly": false, "anomalyMonth": null, "adjRunRateMonthly": 54963.67, "adjProjectedQ4": 164891.0, "adjProjectedFY": 660713.84, "adjProjectedVariance": 713.84}, {"cc": "CC-600", "ccName": "Administration", "gl": "6520", "glName": "Office & Admin Supplies", "ytdActual": 132504.11, "annualBudget": 180000.0, "runRateMonthly": 14507.95, "projectedQ4": 43523.84, "projectedFY": 176027.95, "projectedVariance": -3972.05, "hasOneTimeAnomaly": false, "anomalyMonth": null, "adjRunRateMonthly": 14507.95, "adjProjectedQ4": 43523.84, "adjProjectedFY": 176027.95, "adjProjectedVariance": -3972.05}], "vendorsByPeriod": [{"vendor": "Sterling Facilities Group", "period": 1, "total": 685174.15, "invoices": 2}, {"vendor": "Sterling Facilities Group", "period": 2, "total": 679150.27, "invoices": 2}, {"vendor": "Sterling Facilities Group", "period": 3, "total": 709934.64, "invoices": 2}, {"vendor": "Sterling Facilities Group", "period": 4, "total": 689401.03, "invoices": 2}, {"vendor": "Sterling Facilities Group", "period": 5, "total": 672578.87, "invoices": 2}, {"vendor": "Sterling Facilities Group", "period": 6, "total": 697944.89, "invoices": 2}, {"vendor": "Sterling Facilities Group", "period": 7, "total": 544065.0, "invoices": 2}, {"vendor": "Sterling Facilities Group", "period": 8, "total": 546900.0, "invoices": 2}, {"vendor": "Sterling Facilities Group", "period": 9, "total": 550680.0, "invoices": 2}, {"vendor": "BlueRiver Utilities Co", "period": 1, "total": 141698.74, "invoices": 1}, {"vendor": "BlueRiver Utilities Co", "period": 2, "total": 149110.29, "invoices": 2}, {"vendor": "BlueRiver Utilities Co", "period": 3, "total": 149216.17, "invoices": 1}, {"vendor": "BlueRiver Utilities Co", "period": 4, "total": 148446.22, "invoices": 2}, {"vendor": "BlueRiver Utilities Co", "period": 5, "total": 152915.69, "invoices": 1}, {"vendor": "BlueRiver Utilities Co", "period": 6, "total": 148877.95, "invoices": 2}, {"vendor": "BlueRiver Utilities Co", "period": 7, "total": 143474.43, "invoices": 2}, {"vendor": "BlueRiver Utilities Co", "period": 8, "total": 149595.39, "invoices": 2}, {"vendor": "BlueRiver Utilities Co", "period": 9, "total": 155170.22, "invoices": 2}, {"vendor": "Granite Builders & Maintenance Co", "period": 1, "total": 46768.93, "invoices": 2}, {"vendor": "Granite Builders & Maintenance Co", "period": 2, "total": 43056.22, "invoices": 1}, {"vendor": "Granite Builders & Maintenance Co", "period": 3, "total": 45757.05, "invoices": 1}, {"vendor": "Granite Builders & Maintenance Co", "period": 4, "total": 46425.68, "invoices": 2}, {"vendor": "Granite Builders & Maintenance Co", "period": 5, "total": 46187.93, "invoices": 2}, {"vendor": "Granite Builders & Maintenance Co", "period": 6, "total": 43092.98, "invoices": 1}, {"vendor": "Granite Builders & Maintenance Co", "period": 7, "total": 46039.92, "invoices": 1}, {"vendor": "Granite Builders & Maintenance Co", "period": 8, "total": 42955.54, "invoices": 2}, {"vendor": "Granite Builders & Maintenance Co", "period": 9, "total": 46583.49, "invoices": 2}, {"vendor": "Pacific Crest IT Solutions", "period": 1, "total": 56804.09, "invoices": 1}, {"vendor": "Pacific Crest IT Solutions", "period": 2, "total": 58440.32, "invoices": 1}, {"vendor": "Pacific Crest IT Solutions", "period": 3, "total": 57307.59, "invoices": 1}, {"vendor": "Pacific Crest IT Solutions", "period": 4, "total": 56821.89, "invoices": 1}, {"vendor": "Pacific Crest IT Solutions", "period": 5, "total": 57913.54, "invoices": 2}, {"vendor": "Pacific Crest IT Solutions", "period": 6, "total": 59303.01, "invoices": 1}, {"vendor": "Pacific Crest IT Solutions", "period": 7, "total": 58455.81, "invoices": 2}, {"vendor": "Pacific Crest IT Solutions", "period": 8, "total": 57279.62, "invoices": 1}, {"vendor": "Pacific Crest IT Solutions", "period": 9, "total": 60577.18, "invoices": 2}, {"vendor": "Apex Staffing Partners", "period": 1, "total": 138722.45, "invoices": 4}, {"vendor": "Apex Staffing Partners", "period": 2, "total": 141533.31, "invoices": 4}, {"vendor": "Apex Staffing Partners", "period": 3, "total": 138881.35, "invoices": 4}, {"vendor": "Apex Staffing Partners", "period": 4, "total": 141821.37, "invoices": 3}, {"vendor": "Apex Staffing Partners", "period": 5, "total": 140271.63, "invoices": 2}, {"vendor": "Apex Staffing Partners", "period": 6, "total": 144589.76, "invoices": 3}, {"vendor": "Apex Staffing Partners", "period": 7, "total": 143211.19, "invoices": 4}, {"vendor": "Apex Staffing Partners", "period": 8, "total": 140272.04, "invoices": 3}, {"vendor": "Apex Staffing Partners", "period": 9, "total": 136412.4, "invoices": 2}, {"vendor": "Harborview Pharma Distribution", "period": 1, "total": 465965.88, "invoices": 2}, {"vendor": "Harborview Pharma Distribution", "period": 2, "total": 474253.47, "invoices": 2}, {"vendor": "Harborview Pharma Distribution", "period": 3, "total": 449828.41, "invoices": 3}, {"vendor": "Harborview Pharma Distribution", "period": 4, "total": 456210.54, "invoices": 2}, {"vendor": "Harborview Pharma Distribution", "period": 5, "total": 475760.19, "invoices": 3}, {"vendor": "Harborview Pharma Distribution", "period": 6, "total": 469820.0, "invoices": 3}, {"vendor": "Harborview Pharma Distribution", "period": 7, "total": 458699.86, "invoices": 3}, {"vendor": "Harborview Pharma Distribution", "period": 8, "total": 458479.5, "invoices": 4}, {"vendor": "Harborview Pharma Distribution", "period": 9, "total": 437638.53, "invoices": 3}, {"vendor": "Meridian Medical Supply", "period": 1, "total": 231406.79, "invoices": 2}, {"vendor": "Meridian Medical Supply", "period": 2, "total": 225678.14, "invoices": 1}, {"vendor": "Meridian Medical Supply", "period": 3, "total": 238461.47, "invoices": 2}, {"vendor": "Meridian Medical Supply", "period": 4, "total": 237990.37, "invoices": 1}, {"vendor": "Meridian Medical Supply", "period": 5, "total": 241228.16, "invoices": 1}, {"vendor": "Meridian Medical Supply", "period": 6, "total": 239312.0, "invoices": 1}, {"vendor": "Meridian Medical Supply", "period": 7, "total": 229921.38, "invoices": 2}, {"vendor": "Meridian Medical Supply", "period": 9, "total": 235889.19, "invoices": 1}, {"vendor": "Meridian Medical Supply", "period": 8, "total": 198333.33, "invoices": 1}, {"vendor": "Crestline Office Supply", "period": 1, "total": 87930.72, "invoices": 4}, {"vendor": "Crestline Office Supply", "period": 2, "total": 84667.47, "invoices": 5}, {"vendor": "Crestline Office Supply", "period": 3, "total": 87553.0, "invoices": 4}, {"vendor": "Crestline Office Supply", "period": 4, "total": 86346.59, "invoices": 5}, {"vendor": "Crestline Office Supply", "period": 5, "total": 87300.42, "invoices": 6}, {"vendor": "Crestline Office Supply", "period": 6, "total": 89657.9, "invoices": 5}, {"vendor": "Crestline Office Supply", "period": 7, "total": 85793.57, "invoices": 4}, {"vendor": "Crestline Office Supply", "period": 8, "total": 86212.74, "invoices": 4}, {"vendor": "Crestline Office Supply", "period": 9, "total": 87993.83, "invoices": 4}, {"vendor": "Lakeside Legal Group", "period": 1, "total": 52479.57, "invoices": 2}, {"vendor": "Lakeside Legal Group", "period": 2, "total": 53708.54, "invoices": 2}, {"vendor": "Lakeside Legal Group", "period": 3, "total": 55448.73, "invoices": 2}, {"vendor": "Lakeside Legal Group", "period": 4, "total": 56321.27, "invoices": 1}, {"vendor": "Lakeside Legal Group", "period": 5, "total": 56315.11, "invoices": 1}, {"vendor": "Lakeside Legal Group", "period": 6, "total": 56658.62, "invoices": 2}, {"vendor": "Lakeside Legal Group", "period": 7, "total": 55856.11, "invoices": 1}, {"vendor": "Lakeside Legal Group", "period": 8, "total": 56290.72, "invoices": 2}, {"vendor": "Lakeside Legal Group", "period": 9, "total": 52744.17, "invoices": 2}, {"vendor": "Northgate Software Solutions", "period": 1, "total": 104266.66, "invoices": 1}, {"vendor": "Northgate Software Solutions", "period": 2, "total": 104266.66, "invoices": 1}, {"vendor": "Northgate Software Solutions", "period": 3, "total": 104266.66, "invoices": 1}, {"vendor": "Northgate Software Solutions", "period": 4, "total": 104266.66, "invoices": 1}, {"vendor": "Northgate Software Solutions", "period": 5, "total": 104266.66, "invoices": 1}, {"vendor": "Northgate Software Solutions", "period": 6, "total": 104266.66, "invoices": 1}, {"vendor": "Northgate Software Solutions", "period": 7, "total": 357000.0, "invoices": 2}, {"vendor": "Northgate Software Solutions", "period": 8, "total": 96333.33, "invoices": 1}, {"vendor": "Northgate Software Solutions", "period": 9, "total": 96333.33, "invoices": 1}, {"vendor": "Quickline IT Supplies", "period": 7, "total": 60000.0, "invoices": 1}, {"vendor": "Quickline IT Supplies", "period": 8, "total": 60000.0, "invoices": 1}, {"vendor": "Quickline IT Supplies", "period": 9, "total": 60000.0, "invoices": 1}, {"vendor": "QuickMed Retail", "period": 8, "total": 35000.0, "invoices": 1}], "vendorTSO": [{"name": "Sterling Facilities Group", "invoiced": 5775828.85, "openPO": 0.0, "openWO": 61506.28, "tso": 5837335.13}, {"name": "Harborview Pharma Distribution", "invoiced": 4146656.38, "openPO": 190484.44, "openWO": 0.0, "tso": 4337140.82}, {"name": "Meridian Medical Supply", "invoiced": 2078220.83, "openPO": 0, "openWO": 0, "tso": 2078220.83}, {"name": "BlueRiver Utilities Co", "invoiced": 1338505.1, "openPO": 0, "openWO": 0, "tso": 1338505.1}, {"name": "Apex Staffing Partners", "invoiced": 1265715.5, "openPO": 17333.33, "openWO": 0.0, "tso": 1283048.83}, {"name": "Northgate Software Solutions", "invoiced": 1175266.62, "openPO": 0, "openWO": 0, "tso": 1175266.62}, {"name": "Crestline Office Supply", "invoiced": 783456.24, "openPO": 9311.57, "openWO": 0.0, "tso": 792767.81}, {"name": "Pacific Crest IT Solutions", "invoiced": 522903.05, "openPO": 17002.32, "openWO": 0.0, "tso": 539905.37}, {"name": "Lakeside Legal Group", "invoiced": 495822.84, "openPO": 0, "openWO": 0, "tso": 495822.84}, {"name": "Granite Builders & Maintenance Co", "invoiced": 406867.74, "openPO": 0.0, "openWO": 12470.59, "tso": 419338.33}, {"name": "Quickline IT Supplies", "invoiced": 180000.0, "openPO": 0, "openWO": 0, "tso": 180000.0}, {"name": "QuickMed Retail", "invoiced": 35000.0, "openPO": 0, "openWO": 0, "tso": 35000.0}], "deptSpend": [{"ccName": "Facilities", "ytdBudget": 4905000.0, "annualBudget": 6540000.0, "ytdActual": 5443836.69, "openPO": 0.0, "openWO": 73976.87, "tso": 5517813.56, "variance": 538836.69}, {"ccName": "Pharmacy", "ytdBudget": 4169999.97, "annualBudget": 5559999.96, "ytdActual": 4146656.38, "openPO": 190484.44, "openWO": 0.0, "tso": 4337140.82, "variance": -23343.59}, {"ccName": "Nursing Operations", "ytdBudget": 2925000.0, "annualBudget": 3900000.0, "ytdActual": 2937539.36, "openPO": 17333.33, "openWO": 0.0, "tso": 2954872.69, "variance": 12539.36}, {"ccName": "Information Technology", "ytdBudget": 2009999.97, "annualBudget": 2679999.96, "ytdActual": 2319566.64, "openPO": 17002.32, "openWO": 0.0, "tso": 2336568.96, "variance": 309566.67}, {"ccName": "Supply Chain", "ytdBudget": 652500.0, "annualBudget": 870000.0, "ytdActual": 650952.13, "openPO": 9311.57, "openWO": 0.0, "tso": 660263.7, "variance": -1547.87}, {"ccName": "Administration", "ytdBudget": 630000.0, "annualBudget": 840000.0, "ytdActual": 628326.95, "openPO": 0.0, "openWO": 0.0, "tso": 628326.95, "variance": -1673.05}]}, "brightline": {"combined": [{"cc": "CC-PHARM", "ccName": "Pharmacy", "pc": "PC-ONC", "pcName": "Oncology & Infusion Services", "gl": "6210", "glName": "Pharmaceutical Supplies", "period": 1, "budget": 750000.0, "actual": 729287.46, "predicted": 735255.35}, {"cc": "CC-PHARM", "ccName": "Pharmacy", "pc": "PC-ONC", "pcName": "Oncology & Infusion Services", "gl": "6210", "glName": "Pharmaceutical Supplies", "period": 2, "budget": 750000.0, "actual": 710432.72, "predicted": 703526.79}, {"cc": "CC-PHARM", "ccName": "Pharmacy", "pc": "PC-ONC", "pcName": "Oncology & Infusion Services", "gl": "6210", "glName": "Pharmaceutical Supplies", "period": 3, "budget": 750000.0, "actual": 773227.8, "predicted": 783240.11}, {"cc": "CC-PHARM", "ccName": "Pharmacy", "pc": "PC-ONC", "pcName": "Oncology & Infusion Services", "gl": "6210", "glName": "Pharmaceutical Supplies", "period": 4, "budget": 750000.0, "actual": 736362.91, "predicted": 739204.28}, {"cc": "CC-PHARM", "ccName": "Pharmacy", "pc": "PC-ONC", "pcName": "Oncology & Infusion Services", "gl": "6210", "glName": "Pharmaceutical Supplies", "period": 5, "budget": 750000.0, "actual": 709433.29, "predicted": 703571.54}, {"cc": "CC-PHARM", "ccName": "Pharmacy", "pc": "PC-ONC", "pcName": "Oncology & Infusion Services", "gl": "6210", "glName": "Pharmaceutical Supplies", "period": 6, "budget": 750000.0, "actual": 748724.77, "predicted": 739004.33}, {"cc": "CC-PHARM", "ccName": "Pharmacy", "pc": "PC-ONC", "pcName": "Oncology & Infusion Services", "gl": "6210", "glName": "Pharmaceutical Supplies", "period": 7, "budget": 750000.0, "actual": 708493.7, "predicted": 714738.46}, {"cc": "CC-PHARM", "ccName": "Pharmacy", "pc": "PC-ONC", "pcName": "Oncology & Infusion Services", "gl": "6210", "glName": "Pharmaceutical Supplies", "period": 8, "budget": 750000.0, "actual": 784090.91, "predicted": 750000.0}, {"cc": "CC-PHARM", "ccName": "Pharmacy", "pc": "PC-ONC", "pcName": "Oncology & Infusion Services", "gl": "6210", "glName": "Pharmaceutical Supplies", "period": 9, "budget": 750000.0, "actual": 784090.91, "predicted": 770026.89}, {"cc": "CC-PHARM", "ccName": "Pharmacy", "pc": "PC-ONC", "pcName": "Oncology & Infusion Services", "gl": "6220", "glName": "Pharmacy Equipment", "period": 1, "budget": 50000.0, "actual": 49703.43, "predicted": 49163.44}, {"cc": "CC-PHARM", "ccName": "Pharmacy", "pc": "PC-ONC", "pcName": "Oncology & Infusion Services", "gl": "6220", "glName": "Pharmacy Equipment", "period": 2, "budget": 50000.0, "actual": 49738.72, "predicted": 49856.83}, {"cc": "CC-PHARM", "ccName": "Pharmacy", "pc": "PC-ONC", "pcName": "Oncology & Infusion Services", "gl": "6220", "glName": "Pharmacy Equipment", "period": 3, "budget": 50000.0, "actual": 49482.08, "predicted": 50179.58}, {"cc": "CC-PHARM", "ccName": "Pharmacy", "pc": "PC-ONC", "pcName": "Oncology & Infusion Services", "gl": "6220", "glName": "Pharmacy Equipment", "period": 4, "budget": 50000.0, "actual": 50971.9, "predicted": 51204.95}, {"cc": "CC-PHARM", "ccName": "Pharmacy", "pc": "PC-ONC", "pcName": "Oncology & Infusion Services", "gl": "6220", "glName": "Pharmacy Equipment", "period": 5, "budget": 50000.0, "actual": 49625.98, "predicted": 49189.71}, {"cc": "CC-PHARM", "ccName": "Pharmacy", "pc": "PC-ONC", "pcName": "Oncology & Infusion Services", "gl": "6220", "glName": "Pharmacy Equipment", "period": 6, "budget": 50000.0, "actual": 47824.81, "predicted": 48623.22}, {"cc": "CC-PHARM", "ccName": "Pharmacy", "pc": "PC-ONC", "pcName": "Oncology & Infusion Services", "gl": "6220", "glName": "Pharmacy Equipment", "period": 7, "budget": 50000.0, "actual": 49865.13, "predicted": 49274.68}, {"cc": "CC-PHARM", "ccName": "Pharmacy", "pc": "PC-ONC", "pcName": "Oncology & Infusion Services", "gl": "6220", "glName": "Pharmacy Equipment", "period": 8, "budget": 50000.0, "actual": 51723.41, "predicted": 50723.23}, {"cc": "CC-PHARM", "ccName": "Pharmacy", "pc": "PC-ONC", "pcName": "Oncology & Infusion Services", "gl": "6220", "glName": "Pharmacy Equipment", "period": 9, "budget": 50000.0, "actual": 51965.48, "predicted": 51485.72}, {"cc": "CC-BIOMED", "ccName": "Biomedical Engineering", "pc": "PC-RAD", "pcName": "Radiology & Imaging", "gl": "6040", "glName": "Medical Equipment Repairs & Maintenance", "period": 1, "budget": 150000.0, "actual": 143520.73, "predicted": 143209.03}, {"cc": "CC-BIOMED", "ccName": "Biomedical Engineering", "pc": "PC-RAD", "pcName": "Radiology & Imaging", "gl": "6040", "glName": "Medical Equipment Repairs & Maintenance", "period": 2, "budget": 150000.0, "actual": 152523.49, "predicted": 149841.86}, {"cc": "CC-BIOMED", "ccName": "Biomedical Engineering", "pc": "PC-RAD", "pcName": "Radiology & Imaging", "gl": "6040", "glName": "Medical Equipment Repairs & Maintenance", "period": 3, "budget": 150000.0, "actual": 154752.24, "predicted": 152748.22}, {"cc": "CC-BIOMED", "ccName": "Biomedical Engineering", "pc": "PC-RAD", "pcName": "Radiology & Imaging", "gl": "6040", "glName": "Medical Equipment Repairs & Maintenance", "period": 4, "budget": 150000.0, "actual": 153959.77, "predicted": 153151.7}, {"cc": "CC-BIOMED", "ccName": "Biomedical Engineering", "pc": "PC-RAD", "pcName": "Radiology & Imaging", "gl": "6040", "glName": "Medical Equipment Repairs & Maintenance", "period": 5, "budget": 150000.0, "actual": 143643.27, "predicted": 144057.94}, {"cc": "CC-BIOMED", "ccName": "Biomedical Engineering", "pc": "PC-RAD", "pcName": "Radiology & Imaging", "gl": "6040", "glName": "Medical Equipment Repairs & Maintenance", "period": 6, "budget": 150000.0, "actual": 153466.4, "predicted": 151204.79}, {"cc": "CC-BIOMED", "ccName": "Biomedical Engineering", "pc": "PC-RAD", "pcName": "Radiology & Imaging", "gl": "6040", "glName": "Medical Equipment Repairs & Maintenance", "period": 7, "budget": 150000.0, "actual": 143185.14, "predicted": 142395.59}, {"cc": "CC-BIOMED", "ccName": "Biomedical Engineering", "pc": "PC-RAD", "pcName": "Radiology & Imaging", "gl": "6040", "glName": "Medical Equipment Repairs & Maintenance", "period": 8, "budget": 150000.0, "actual": 1377500.0, "predicted": 150000.0}, {"cc": "CC-BIOMED", "ccName": "Biomedical Engineering", "pc": "PC-RAD", "pcName": "Radiology & Imaging", "gl": "6040", "glName": "Medical Equipment Repairs & Maintenance", "period": 9, "budget": 150000.0, "actual": 155278.29, "predicted": 157706.47}, {"cc": "CC-SURG", "ccName": "Surgical Services", "pc": "PC-ORTHO", "pcName": "Orthopedics & Cardiology", "gl": "6310", "glName": "Medical/Surgical Supplies", "period": 1, "budget": 625000.0, "actual": 591709.23, "predicted": 603081.73}, {"cc": "CC-SURG", "ccName": "Surgical Services", "pc": "PC-ORTHO", "pcName": "Orthopedics & Cardiology", "gl": "6310", "glName": "Medical/Surgical Supplies", "period": 2, "budget": 625000.0, "actual": 608753.35, "predicted": 612574.67}, {"cc": "CC-SURG", "ccName": "Surgical Services", "pc": "PC-ORTHO", "pcName": "Orthopedics & Cardiology", "gl": "6310", "glName": "Medical/Surgical Supplies", "period": 3, "budget": 625000.0, "actual": 596954.06, "predicted": 601520.08}, {"cc": "CC-SURG", "ccName": "Surgical Services", "pc": "PC-ORTHO", "pcName": "Orthopedics & Cardiology", "gl": "6310", "glName": "Medical/Surgical Supplies", "period": 4, "budget": 625000.0, "actual": 591894.72, "predicted": 593893.91}, {"cc": "CC-SURG", "ccName": "Surgical Services", "pc": "PC-ORTHO", "pcName": "Orthopedics & Cardiology", "gl": "6310", "glName": "Medical/Surgical Supplies", "period": 5, "budget": 625000.0, "actual": 603266.11, "predicted": 594587.46}, {"cc": "CC-SURG", "ccName": "Surgical Services", "pc": "PC-ORTHO", "pcName": "Orthopedics & Cardiology", "gl": "6310", "glName": "Medical/Surgical Supplies", "period": 6, "budget": 625000.0, "actual": 617739.67, "predicted": 606251.7}, {"cc": "CC-SURG", "ccName": "Surgical Services", "pc": "PC-ORTHO", "pcName": "Orthopedics & Cardiology", "gl": "6310", "glName": "Medical/Surgical Supplies", "period": 7, "budget": 625000.0, "actual": 608914.74, "predicted": 597172.29}, {"cc": "CC-SURG", "ccName": "Surgical Services", "pc": "PC-ORTHO", "pcName": "Orthopedics & Cardiology", "gl": "6310", "glName": "Medical/Surgical Supplies", "period": 8, "budget": 625000.0, "actual": 596662.66, "predicted": 606453.0}, {"cc": "CC-SURG", "ccName": "Surgical Services", "pc": "PC-ORTHO", "pcName": "Orthopedics & Cardiology", "gl": "6310", "glName": "Medical/Surgical Supplies", "period": 9, "budget": 625000.0, "actual": 631012.3, "predicted": 636084.88}, {"cc": "CC-SURG", "ccName": "Surgical Services", "pc": "PC-ORTHO", "pcName": "Orthopedics & Cardiology", "gl": "6320", "glName": "Clinical Contract Staffing", "period": 1, "budget": 183333.33, "actual": 186616.0, "predicted": 190070.42}, {"cc": "CC-SURG", "ccName": "Surgical Services", "pc": "PC-ORTHO", "pcName": "Orthopedics & Cardiology", "gl": "6320", "glName": "Clinical Contract Staffing", "period": 2, "budget": 183333.33, "actual": 175998.49, "predicted": 172628.18}, {"cc": "CC-SURG", "ccName": "Surgical Services", "pc": "PC-ORTHO", "pcName": "Orthopedics & Cardiology", "gl": "6320", "glName": "Clinical Contract Staffing", "period": 3, "budget": 183333.33, "actual": 185029.56, "predicted": 186037.49}, {"cc": "CC-SURG", "ccName": "Surgical Services", "pc": "PC-ORTHO", "pcName": "Orthopedics & Cardiology", "gl": "6320", "glName": "Clinical Contract Staffing", "period": 4, "budget": 183333.33, "actual": 180951.47, "predicted": 180822.89}, {"cc": "CC-SURG", "ccName": "Surgical Services", "pc": "PC-ORTHO", "pcName": "Orthopedics & Cardiology", "gl": "6320", "glName": "Clinical Contract Staffing", "period": 5, "budget": 183333.33, "actual": 173887.6, "predicted": 175490.83}, {"cc": "CC-SURG", "ccName": "Surgical Services", "pc": "PC-ORTHO", "pcName": "Orthopedics & Cardiology", "gl": "6320", "glName": "Clinical Contract Staffing", "period": 6, "budget": 183333.33, "actual": 186085.91, "predicted": 184737.94}, {"cc": "CC-SURG", "ccName": "Surgical Services", "pc": "PC-ORTHO", "pcName": "Orthopedics & Cardiology", "gl": "6320", "glName": "Clinical Contract Staffing", "period": 7, "budget": 183333.33, "actual": 179590.37, "predicted": 183177.56}, {"cc": "CC-SURG", "ccName": "Surgical Services", "pc": "PC-ORTHO", "pcName": "Orthopedics & Cardiology", "gl": "6320", "glName": "Clinical Contract Staffing", "period": 8, "budget": 183333.33, "actual": 175104.42, "predicted": 172129.49}, {"cc": "CC-SURG", "ccName": "Surgical Services", "pc": "PC-ORTHO", "pcName": "Orthopedics & Cardiology", "gl": "6320", "glName": "Clinical Contract Staffing", "period": 9, "budget": 183333.33, "actual": 175191.72, "predicted": 175514.74}, {"cc": "CC-ADMIN", "ccName": "Administration & Legal", "pc": "PC-CORP", "pcName": "Corporate", "gl": "6510", "glName": "Legal & Professional Services", "period": 1, "budget": 116666.67, "actual": 116666.67, "predicted": 117772.7}, {"cc": "CC-ADMIN", "ccName": "Administration & Legal", "pc": "PC-CORP", "pcName": "Corporate", "gl": "6510", "glName": "Legal & Professional Services", "period": 2, "budget": 116666.67, "actual": 116666.67, "predicted": 118534.25}, {"cc": "CC-ADMIN", "ccName": "Administration & Legal", "pc": "PC-CORP", "pcName": "Corporate", "gl": "6510", "glName": "Legal & Professional Services", "period": 3, "budget": 116666.67, "actual": 116666.67, "predicted": 117773.08}, {"cc": "CC-ADMIN", "ccName": "Administration & Legal", "pc": "PC-CORP", "pcName": "Corporate", "gl": "6510", "glName": "Legal & Professional Services", "period": 4, "budget": 116666.67, "actual": 116666.67, "predicted": 117617.23}, {"cc": "CC-ADMIN", "ccName": "Administration & Legal", "pc": "PC-CORP", "pcName": "Corporate", "gl": "6510", "glName": "Legal & Professional Services", "period": 5, "budget": 116666.67, "actual": 116666.67, "predicted": 118035.25}, {"cc": "CC-ADMIN", "ccName": "Administration & Legal", "pc": "PC-CORP", "pcName": "Corporate", "gl": "6510", "glName": "Legal & Professional Services", "period": 6, "budget": 116666.67, "actual": 116666.67, "predicted": 118603.35}, {"cc": "CC-ADMIN", "ccName": "Administration & Legal", "pc": "PC-CORP", "pcName": "Corporate", "gl": "6510", "glName": "Legal & Professional Services", "period": 7, "budget": 116666.67, "actual": 132666.67, "predicted": 116666.67}, {"cc": "CC-ADMIN", "ccName": "Administration & Legal", "pc": "PC-CORP", "pcName": "Corporate", "gl": "6510", "glName": "Legal & Professional Services", "period": 8, "budget": 116666.67, "actual": 132666.67, "predicted": 131413.64}, {"cc": "CC-ADMIN", "ccName": "Administration & Legal", "pc": "PC-CORP", "pcName": "Corporate", "gl": "6510", "glName": "Legal & Professional Services", "period": 9, "budget": 116666.67, "actual": 132666.67, "predicted": 132740.22}, {"cc": "CC-IT", "ccName": "Information Technology", "pc": "PC-CORP", "pcName": "Corporate", "gl": "6110", "glName": "Software Subscriptions & Licensing", "period": 1, "budget": 216666.67, "actual": 217742.95, "predicted": 221234.12}, {"cc": "CC-IT", "ccName": "Information Technology", "pc": "PC-CORP", "pcName": "Corporate", "gl": "6110", "glName": "Software Subscriptions & Licensing", "period": 2, "budget": 216666.67, "actual": 221566.7, "predicted": 224855.65}, {"cc": "CC-IT", "ccName": "Information Technology", "pc": "PC-CORP", "pcName": "Corporate", "gl": "6110", "glName": "Software Subscriptions & Licensing", "period": 3, "budget": 216666.67, "actual": 210014.28, "predicted": 209318.32}, {"cc": "CC-IT", "ccName": "Information Technology", "pc": "PC-CORP", "pcName": "Corporate", "gl": "6110", "glName": "Software Subscriptions & Licensing", "period": 4, "budget": 216666.67, "actual": 212745.28, "predicted": 215217.65}, {"cc": "CC-IT", "ccName": "Information Technology", "pc": "PC-CORP", "pcName": "Corporate", "gl": "6110", "glName": "Software Subscriptions & Licensing", "period": 5, "budget": 216666.67, "actual": 223116.92, "predicted": 226360.8}, {"cc": "CC-IT", "ccName": "Information Technology", "pc": "PC-CORP", "pcName": "Corporate", "gl": "6110", "glName": "Software Subscriptions & Licensing", "period": 6, "budget": 216666.67, "actual": 220490.97, "predicted": 221133.11}, {"cc": "CC-IT", "ccName": "Information Technology", "pc": "PC-CORP", "pcName": "Corporate", "gl": "6110", "glName": "Software Subscriptions & Licensing", "period": 7, "budget": 216666.67, "actual": 213925.68, "predicted": 214994.97}, {"cc": "CC-IT", "ccName": "Information Technology", "pc": "PC-CORP", "pcName": "Corporate", "gl": "6110", "glName": "Software Subscriptions & Licensing", "period": 8, "budget": 216666.67, "actual": 214897.56, "predicted": 213886.11}, {"cc": "CC-IT", "ccName": "Information Technology", "pc": "PC-CORP", "pcName": "Corporate", "gl": "6110", "glName": "Software Subscriptions & Licensing", "period": 9, "budget": 216666.67, "actual": 204580.98, "predicted": 205257.56}, {"cc": "CC-IT", "ccName": "Information Technology", "pc": "PC-TELE", "pcName": "Telehealth Services", "gl": "6120", "glName": "IT Hardware", "period": 1, "budget": 91666.67, "actual": 93133.27, "predicted": 93538.84}, {"cc": "CC-IT", "ccName": "Information Technology", "pc": "PC-TELE", "pcName": "Telehealth Services", "gl": "6120", "glName": "IT Hardware", "period": 2, "budget": 91666.67, "actual": 95089.14, "predicted": 93492.41}, {"cc": "CC-IT", "ccName": "Information Technology", "pc": "PC-TELE", "pcName": "Telehealth Services", "gl": "6120", "glName": "IT Hardware", "period": 3, "budget": 91666.67, "actual": 91055.12, "predicted": 91562.86}, {"cc": "CC-IT", "ccName": "Information Technology", "pc": "PC-TELE", "pcName": "Telehealth Services", "gl": "6120", "glName": "IT Hardware", "period": 4, "budget": 91666.67, "actual": 93866.67, "predicted": 95718.93}, {"cc": "CC-IT", "ccName": "Information Technology", "pc": "PC-TELE", "pcName": "Telehealth Services", "gl": "6120", "glName": "IT Hardware", "period": 5, "budget": 91666.67, "actual": 90219.42, "predicted": 91590.0}, {"cc": "CC-IT", "ccName": "Information Technology", "pc": "PC-TELE", "pcName": "Telehealth Services", "gl": "6120", "glName": "IT Hardware", "period": 6, "budget": 91666.67, "actual": 88116.32, "predicted": 88920.67}, {"cc": "CC-IT", "ccName": "Information Technology", "pc": "PC-TELE", "pcName": "Telehealth Services", "gl": "6120", "glName": "IT Hardware", "period": 7, "budget": 91666.67, "actual": 94259.3, "predicted": 93838.66}, {"cc": "CC-IT", "ccName": "Information Technology", "pc": "PC-TELE", "pcName": "Telehealth Services", "gl": "6120", "glName": "IT Hardware", "period": 8, "budget": 91666.67, "actual": 87646.77, "predicted": 88470.78}, {"cc": "CC-IT", "ccName": "Information Technology", "pc": "PC-TELE", "pcName": "Telehealth Services", "gl": "6120", "glName": "IT Hardware", "period": 9, "budget": 91666.67, "actual": 87011.78, "predicted": 87293.53}, {"cc": "CC-FAC", "ccName": "Facilities", "pc": "PC-CORP", "pcName": "Corporate", "gl": "6010", "glName": "Facilities Management Services", "period": 1, "budget": 483333.33, "actual": 479342.63, "predicted": 478202.23}, {"cc": "CC-FAC", "ccName": "Facilities", "pc": "PC-CORP", "pcName": "Corporate", "gl": "6010", "glName": "Facilities Management Services", "period": 2, "budget": 483333.33, "actual": 467476.15, "predicted": 473803.35}, {"cc": "CC-FAC", "ccName": "Facilities", "pc": "PC-CORP", "pcName": "Corporate", "gl": "6010", "glName": "Facilities Management Services", "period": 3, "budget": 483333.33, "actual": 493955.89, "predicted": 485732.16}, {"cc": "CC-FAC", "ccName": "Facilities", "pc": "PC-CORP", "pcName": "Corporate", "gl": "6010", "glName": "Facilities Management Services", "period": 4, "budget": 483333.33, "actual": 492980.06, "predicted": 497914.01}, {"cc": "CC-FAC", "ccName": "Facilities", "pc": "PC-CORP", "pcName": "Corporate", "gl": "6010", "glName": "Facilities Management Services", "period": 5, "budget": 483333.33, "actual": 499686.9, "predicted": 490288.59}, {"cc": "CC-FAC", "ccName": "Facilities", "pc": "PC-CORP", "pcName": "Corporate", "gl": "6010", "glName": "Facilities Management Services", "period": 6, "budget": 483333.33, "actual": 495717.71, "predicted": 497726.07}, {"cc": "CC-FAC", "ccName": "Facilities", "pc": "PC-CORP", "pcName": "Corporate", "gl": "6010", "glName": "Facilities Management Services", "period": 7, "budget": 483333.33, "actual": 476265.72, "predicted": 475902.94}, {"cc": "CC-FAC", "ccName": "Facilities", "pc": "PC-CORP", "pcName": "Corporate", "gl": "6010", "glName": "Facilities Management Services", "period": 8, "budget": 483333.33, "actual": 488627.6, "predicted": 483354.75}, {"cc": "CC-FAC", "ccName": "Facilities", "pc": "PC-CORP", "pcName": "Corporate", "gl": "6010", "glName": "Facilities Management Services", "period": 9, "budget": 483333.33, "actual": 463088.72, "predicted": 466762.58}, {"cc": "CC-FAC", "ccName": "Facilities", "pc": "PC-CORP", "pcName": "Corporate", "gl": "6020", "glName": "Utilities", "period": 1, "budget": 216666.67, "actual": 221079.72, "predicted": 221055.41}, {"cc": "CC-FAC", "ccName": "Facilities", "pc": "PC-CORP", "pcName": "Corporate", "gl": "6020", "glName": "Utilities", "period": 2, "budget": 216666.67, "actual": 208989.72, "predicted": 209946.92}, {"cc": "CC-FAC", "ccName": "Facilities", "pc": "PC-CORP", "pcName": "Corporate", "gl": "6020", "glName": "Utilities", "period": 3, "budget": 216666.67, "actual": 218567.74, "predicted": 222243.74}, {"cc": "CC-FAC", "ccName": "Facilities", "pc": "PC-CORP", "pcName": "Corporate", "gl": "6020", "glName": "Utilities", "period": 4, "budget": 216666.67, "actual": 219458.29, "predicted": 217314.89}, {"cc": "CC-FAC", "ccName": "Facilities", "pc": "PC-CORP", "pcName": "Corporate", "gl": "6020", "glName": "Utilities", "period": 5, "budget": 216666.67, "actual": 221801.42, "predicted": 217465.71}, {"cc": "CC-FAC", "ccName": "Facilities", "pc": "PC-CORP", "pcName": "Corporate", "gl": "6020", "glName": "Utilities", "period": 6, "budget": 216666.67, "actual": 222730.18, "predicted": 220957.54}, {"cc": "CC-FAC", "ccName": "Facilities", "pc": "PC-CORP", "pcName": "Corporate", "gl": "6020", "glName": "Utilities", "period": 7, "budget": 216666.67, "actual": 218674.86, "predicted": 220233.02}, {"cc": "CC-FAC", "ccName": "Facilities", "pc": "PC-CORP", "pcName": "Corporate", "gl": "6020", "glName": "Utilities", "period": 8, "budget": 216666.67, "actual": 209495.8, "predicted": 207003.42}, {"cc": "CC-FAC", "ccName": "Facilities", "pc": "PC-CORP", "pcName": "Corporate", "gl": "6020", "glName": "Utilities", "period": 9, "budget": 216666.67, "actual": 224740.17, "predicted": 221770.07}, {"cc": "CC-PROC", "ccName": "Procurement", "pc": "PC-NEURO", "pcName": "Neurosurgery", "gl": "6420", "glName": "Logistics & Distribution", "period": 1, "budget": 60000.0, "actual": 58689.76, "predicted": 59642.23}, {"cc": "CC-PROC", "ccName": "Procurement", "pc": "PC-NEURO", "pcName": "Neurosurgery", "gl": "6420", "glName": "Logistics & Distribution", "period": 2, "budget": 60000.0, "actual": 61302.27, "predicted": 61694.58}, {"cc": "CC-PROC", "ccName": "Procurement", "pc": "PC-NEURO", "pcName": "Neurosurgery", "gl": "6420", "glName": "Logistics & Distribution", "period": 3, "budget": 60000.0, "actual": 58763.88, "predicted": 58627.39}, {"cc": "CC-PROC", "ccName": "Procurement", "pc": "PC-NEURO", "pcName": "Neurosurgery", "gl": "6420", "glName": "Logistics & Distribution", "period": 4, "budget": 60000.0, "actual": 61104.24, "predicted": 62061.69}, {"cc": "CC-PROC", "ccName": "Procurement", "pc": "PC-NEURO", "pcName": "Neurosurgery", "gl": "6420", "glName": "Logistics & Distribution", "period": 5, "budget": 60000.0, "actual": 61751.66, "predicted": 61324.24}, {"cc": "CC-PROC", "ccName": "Procurement", "pc": "PC-NEURO", "pcName": "Neurosurgery", "gl": "6420", "glName": "Logistics & Distribution", "period": 6, "budget": 60000.0, "actual": 59904.37, "predicted": 60301.89}, {"cc": "CC-PROC", "ccName": "Procurement", "pc": "PC-NEURO", "pcName": "Neurosurgery", "gl": "6420", "glName": "Logistics & Distribution", "period": 7, "budget": 60000.0, "actual": 57198.56, "predicted": 56508.76}, {"cc": "CC-PROC", "ccName": "Procurement", "pc": "PC-NEURO", "pcName": "Neurosurgery", "gl": "6420", "glName": "Logistics & Distribution", "period": 8, "budget": 60000.0, "actual": 60157.36, "predicted": 59991.07}, {"cc": "CC-PROC", "ccName": "Procurement", "pc": "PC-NEURO", "pcName": "Neurosurgery", "gl": "6420", "glName": "Logistics & Distribution", "period": 9, "budget": 60000.0, "actual": 59141.69, "predicted": 59865.56}], "vendors": [{"name": "Vantage Surgical Supply", "total": 7065362.38, "invoices": 28}, {"name": "MedFlow Pharma Distribution", "total": 6684144.47, "invoices": 9}, {"name": "Crestwood Facilities Group", "total": 6322679.28, "invoices": 26}, {"name": "Summit IT Partners", "total": 2759479.11, "invoices": 25}, {"name": "Apex Imaging Systems", "total": 2577829.33, "invoices": 14}, {"name": "Halsted Legal Advisors", "total": 582000.03, "invoices": 9}, {"name": "Northstar Logistics", "total": 538013.79, "invoices": 14}, {"name": "Whitfield & Cole LLP", "total": 516000.0, "invoices": 9}, {"name": "Pinnacle Pharmacy Equipment", "total": 450900.94, "invoices": 16}], "contracts": [{"contract_id": "C-410", "vendor_name": "MedFlow Pharma Distribution", "vendor_ein": "61-1122334", "contract_name": "Oncology Pharmaceutical GPO Agreement", "category": "Pharmaceutical Supplies", "cost_center_code": "CC-PHARM", "profit_center_code": "PC-ONC", "gl_code": "6210", "start_date": "2024-01-01", "end_date": "2027-12-31", "contracted_terms": "Tiered GPO pricing: Tier 1 = 12% off list (requires >=$750,000/mo trailing volume), Tier 2 = 8% off list", "annual_value_estimate": "9000000", "renewal_notice_days": "120", "auto_renew": "Yes", "notes": "Q2 2026 purchase volume fell below the Tier 1 rolling threshold; MedFlow moved the account to Tier 2 pricing for Aug-Sep 2026, increasing net cost by approximately $34,091/month with no change in order quantity (GPO tier movement variance)."}, {"contract_id": "C-440", "vendor_name": "Apex Imaging Systems", "vendor_ein": "62-2233445", "contract_name": "MRI Suite 2 Gradient Coil & Console Upgrade (Project APX-2026-114)", "category": "Capital Equipment", "cost_center_code": "CC-BIOMED", "profit_center_code": "PC-RAD", "gl_code": "6040", "start_date": "2026-08-01", "end_date": "2026-08-31", "contracted_terms": "One-time project, $1,250,000", "annual_value_estimate": "1250000", "renewal_notice_days": "0", "auto_renew": "No", "notes": "Invoiced and expensed entirely to GL 6040 (Medical Equipment Repairs & Maintenance). Exceeds the $10,000 capitalization threshold and has a useful life > 1 year; per capitalization policy this should be recorded as a capital asset and depreciated over 7 years (CAPEX reclassification leak)."}, {"contract_id": "C-520", "vendor_name": "Whitfield & Cole LLP", "vendor_ein": "63-3344556", "contract_name": "Outside Counsel - CMS Billing Compliance Matter", "category": "Legal & Professional Services", "cost_center_code": "CC-ADMIN", "profit_center_code": "PC-CORP", "gl_code": "6510", "start_date": "2025-09-01", "end_date": "2026-12-31", "contracted_terms": "Hourly, sole-source - $650.00/hr through June 2026, $850.00/hr effective July 2026", "annual_value_estimate": "816000", "renewal_notice_days": "30", "auto_renew": "No", "notes": "Sole-source engagement for an active CMS billing compliance matter; no competitive alternative counsel with the required regulatory specialty. Rate increased 30.8% effective July 2026 (sole-source vendor inflation)."}, {"contract_id": "C-430", "vendor_name": "Vantage Surgical Supply", "vendor_ein": "64-4455667", "contract_name": "Surgical Supply & Implant Agreement", "category": "Medical/Surgical Supplies", "cost_center_code": "CC-SURG", "profit_center_code": "PC-ORTHO", "gl_code": "6310", "start_date": "2024-04-01", "end_date": "2027-03-31", "contracted_terms": "Negotiated unit pricing schedule", "annual_value_estimate": "7500000", "renewal_notice_days": "90", "auto_renew": "Yes", "notes": ""}, {"contract_id": "C-450", "vendor_name": "Crestwood Facilities Group", "vendor_ein": "65-5566778", "contract_name": "Facilities Management & Utilities Agreement", "category": "Facilities Management Services", "cost_center_code": "CC-FAC", "profit_center_code": "PC-CORP", "gl_code": "6010", "start_date": "2023-01-01", "end_date": "2027-12-31", "contracted_terms": "Fixed monthly fee plus utilities pass-through", "annual_value_estimate": "5800000", "renewal_notice_days": "120", "auto_renew": "Yes", "notes": ""}, {"contract_id": "C-470", "vendor_name": "Summit IT Partners", "vendor_ein": "66-6677889", "contract_name": "Enterprise Software & Hardware Agreement", "category": "Software Subscriptions & Licensing", "cost_center_code": "CC-IT", "profit_center_code": "PC-CORP", "gl_code": "6110", "start_date": "2025-01-01", "end_date": "2027-12-31", "contracted_terms": "Annual subscription, billed monthly", "annual_value_estimate": "2600000", "renewal_notice_days": "90", "auto_renew": "Yes", "notes": ""}], "forecast": [{"cc": "CC-PHARM", "ccName": "Pharmacy", "gl": "6210", "glName": "Pharmaceutical Supplies", "ytdActual": 6684144.47, "annualBudget": 9000000.0, "runRateMonthly": 758891.84, "projectedQ4": 2276675.52, "projectedFY": 8960819.99, "projectedVariance": -39180.01, "hasOneTimeAnomaly": false, "anomalyMonth": null, "adjRunRateMonthly": 758891.84, "adjProjectedQ4": 2276675.52, "adjProjectedFY": 8960819.99, "adjProjectedVariance": -39180.01}, {"cc": "CC-PHARM", "ccName": "Pharmacy", "gl": "6220", "glName": "Pharmacy Equipment", "ytdActual": 450900.94, "annualBudget": 600000.0, "runRateMonthly": 51184.67, "projectedQ4": 153554.02, "projectedFY": 604454.96, "projectedVariance": 4454.96, "hasOneTimeAnomaly": false, "anomalyMonth": null, "adjRunRateMonthly": 51184.67, "adjProjectedQ4": 153554.02, "adjProjectedFY": 604454.96, "adjProjectedVariance": 4454.96}, {"cc": "CC-BIOMED", "ccName": "Biomedical Engineering", "gl": "6040", "glName": "Medical Equipment Repairs & Maintenance", "ytdActual": 2577829.33, "annualBudget": 1800000.0, "runRateMonthly": 558654.48, "projectedQ4": 1675963.43, "projectedFY": 4253792.76, "projectedVariance": 2453792.76, "hasOneTimeAnomaly": true, "anomalyMonth": 8, "adjRunRateMonthly": 149231.72, "adjProjectedQ4": 447695.15, "adjProjectedFY": 3025524.48, "adjProjectedVariance": 1225524.48}, {"cc": "CC-SURG", "ccName": "Surgical Services", "gl": "6310", "glName": "Medical/Surgical Supplies", "ytdActual": 5446906.84, "annualBudget": 7500000.0, "runRateMonthly": 612196.57, "projectedQ4": 1836589.7, "projectedFY": 7283496.54, "projectedVariance": -216503.46, "hasOneTimeAnomaly": false, "anomalyMonth": null, "adjRunRateMonthly": 612196.57, "adjProjectedQ4": 1836589.7, "adjProjectedFY": 7283496.54, "adjProjectedVariance": -216503.46}, {"cc": "CC-SURG", "ccName": "Surgical Services", "gl": "6320", "glName": "Clinical Contract Staffing", "ytdActual": 1618455.54, "annualBudget": 2199999.96, "runRateMonthly": 176628.84, "projectedQ4": 529886.51, "projectedFY": 2148342.05, "projectedVariance": -51657.91, "hasOneTimeAnomaly": false, "anomalyMonth": null, "adjRunRateMonthly": 176628.84, "adjProjectedQ4": 529886.51, "adjProjectedFY": 2148342.05, "adjProjectedVariance": -51657.91}, {"cc": "CC-ADMIN", "ccName": "Administration & Legal", "gl": "6510", "glName": "Legal & Professional Services", "ytdActual": 1098000.03, "annualBudget": 1400000.04, "runRateMonthly": 132666.67, "projectedQ4": 398000.01, "projectedFY": 1496000.04, "projectedVariance": 96000.0, "hasOneTimeAnomaly": false, "anomalyMonth": null, "adjRunRateMonthly": 132666.67, "adjProjectedQ4": 398000.01, "adjProjectedFY": 1496000.04, "adjProjectedVariance": 96000.0}, {"cc": "CC-IT", "ccName": "Information Technology", "gl": "6110", "glName": "Software Subscriptions & Licensing", "ytdActual": 1939081.32, "annualBudget": 2600000.04, "runRateMonthly": 211134.74, "projectedQ4": 633404.22, "projectedFY": 2572485.54, "projectedVariance": -27514.5, "hasOneTimeAnomaly": false, "anomalyMonth": null, "adjRunRateMonthly": 211134.74, "adjProjectedQ4": 633404.22, "adjProjectedFY": 2572485.54, "adjProjectedVariance": -27514.5}, {"cc": "CC-IT", "ccName": "Information Technology", "gl": "6120", "glName": "IT Hardware", "ytdActual": 820397.79, "annualBudget": 1100000.04, "runRateMonthly": 89639.28, "projectedQ4": 268917.85, "projectedFY": 1089315.64, "projectedVariance": -10684.4, "hasOneTimeAnomaly": false, "anomalyMonth": null, "adjRunRateMonthly": 89639.28, "adjProjectedQ4": 268917.85, "adjProjectedFY": 1089315.64, "adjProjectedVariance": -10684.4}, {"cc": "CC-FAC", "ccName": "Facilities", "gl": "6010", "glName": "Facilities Management Services", "ytdActual": 4357141.38, "annualBudget": 5799999.96, "runRateMonthly": 475994.01, "projectedQ4": 1427982.04, "projectedFY": 5785123.42, "projectedVariance": -14876.54, "hasOneTimeAnomaly": false, "anomalyMonth": null, "adjRunRateMonthly": 475994.01, "adjProjectedQ4": 1427982.04, "adjProjectedFY": 5785123.42, "adjProjectedVariance": -14876.54}, {"cc": "CC-FAC", "ccName": "Facilities", "gl": "6020", "glName": "Utilities", "ytdActual": 1965537.9, "annualBudget": 2600000.04, "runRateMonthly": 217636.94, "projectedQ4": 652910.83, "projectedFY": 2618448.73, "projectedVariance": 18448.69, "hasOneTimeAnomaly": false, "anomalyMonth": null, "adjRunRateMonthly": 217636.94, "adjProjectedQ4": 652910.83, "adjProjectedFY": 2618448.73, "adjProjectedVariance": 18448.69}, {"cc": "CC-PROC", "ccName": "Procurement", "gl": "6420", "glName": "Logistics & Distribution", "ytdActual": 538013.79, "annualBudget": 720000.0, "runRateMonthly": 58832.54, "projectedQ4": 176497.61, "projectedFY": 714511.4, "projectedVariance": -5488.6, "hasOneTimeAnomaly": false, "anomalyMonth": null, "adjRunRateMonthly": 58832.54, "adjProjectedQ4": 176497.61, "adjProjectedFY": 714511.4, "adjProjectedVariance": -5488.6}], "vendorsByPeriod": [{"vendor": "MedFlow Pharma Distribution", "period": 1, "total": 729287.46, "invoices": 1}, {"vendor": "MedFlow Pharma Distribution", "period": 2, "total": 710432.72, "invoices": 1}, {"vendor": "MedFlow Pharma Distribution", "period": 3, "total": 773227.8, "invoices": 1}, {"vendor": "MedFlow Pharma Distribution", "period": 4, "total": 736362.91, "invoices": 1}, {"vendor": "MedFlow Pharma Distribution", "period": 5, "total": 709433.29, "invoices": 1}, {"vendor": "MedFlow Pharma Distribution", "period": 6, "total": 748724.77, "invoices": 1}, {"vendor": "MedFlow Pharma Distribution", "period": 7, "total": 708493.7, "invoices": 1}, {"vendor": "MedFlow Pharma Distribution", "period": 8, "total": 784090.91, "invoices": 1}, {"vendor": "MedFlow Pharma Distribution", "period": 9, "total": 784090.91, "invoices": 1}, {"vendor": "Pinnacle Pharmacy Equipment", "period": 1, "total": 49703.43, "invoices": 2}, {"vendor": "Pinnacle Pharmacy Equipment", "period": 2, "total": 49738.72, "invoices": 1}, {"vendor": "Pinnacle Pharmacy Equipment", "period": 3, "total": 49482.08, "invoices": 2}, {"vendor": "Pinnacle Pharmacy Equipment", "period": 4, "total": 50971.9, "invoices": 1}, {"vendor": "Pinnacle Pharmacy Equipment", "period": 5, "total": 49625.98, "invoices": 2}, {"vendor": "Pinnacle Pharmacy Equipment", "period": 6, "total": 47824.81, "invoices": 2}, {"vendor": "Pinnacle Pharmacy Equipment", "period": 7, "total": 49865.13, "invoices": 2}, {"vendor": "Pinnacle Pharmacy Equipment", "period": 8, "total": 51723.41, "invoices": 2}, {"vendor": "Pinnacle Pharmacy Equipment", "period": 9, "total": 51965.48, "invoices": 2}, {"vendor": "Apex Imaging Systems", "period": 1, "total": 143520.73, "invoices": 1}, {"vendor": "Apex Imaging Systems", "period": 2, "total": 152523.49, "invoices": 1}, {"vendor": "Apex Imaging Systems", "period": 3, "total": 154752.24, "invoices": 2}, {"vendor": "Apex Imaging Systems", "period": 4, "total": 153959.77, "invoices": 2}, {"vendor": "Apex Imaging Systems", "period": 5, "total": 143643.27, "invoices": 1}, {"vendor": "Apex Imaging Systems", "period": 6, "total": 153466.4, "invoices": 1}, {"vendor": "Apex Imaging Systems", "period": 7, "total": 143185.14, "invoices": 2}, {"vendor": "Apex Imaging Systems", "period": 9, "total": 155278.29, "invoices": 2}, {"vendor": "Apex Imaging Systems", "period": 8, "total": 1377500.0, "invoices": 2}, {"vendor": "Vantage Surgical Supply", "period": 1, "total": 778325.23, "invoices": 3}, {"vendor": "Vantage Surgical Supply", "period": 2, "total": 784751.84, "invoices": 3}, {"vendor": "Vantage Surgical Supply", "period": 3, "total": 781983.62, "invoices": 3}, {"vendor": "Vantage Surgical Supply", "period": 4, "total": 772846.19, "invoices": 3}, {"vendor": "Vantage Surgical Supply", "period": 5, "total": 777153.71, "invoices": 3}, {"vendor": "Vantage Surgical Supply", "period": 6, "total": 803825.58, "invoices": 3}, {"vendor": "Vantage Surgical Supply", "period": 7, "total": 788505.11, "invoices": 4}, {"vendor": "Vantage Surgical Supply", "period": 8, "total": 771767.08, "invoices": 3}, {"vendor": "Vantage Surgical Supply", "period": 9, "total": 806204.02, "invoices": 3}, {"vendor": "Summit IT Partners", "period": 1, "total": 310876.22, "invoices": 2}, {"vendor": "Summit IT Partners", "period": 2, "total": 316655.84, "invoices": 2}, {"vendor": "Summit IT Partners", "period": 3, "total": 301069.4, "invoices": 3}, {"vendor": "Summit IT Partners", "period": 4, "total": 306611.95, "invoices": 2}, {"vendor": "Summit IT Partners", "period": 5, "total": 313336.34, "invoices": 3}, {"vendor": "Summit IT Partners", "period": 6, "total": 308607.29, "invoices": 3}, {"vendor": "Summit IT Partners", "period": 7, "total": 308184.98, "invoices": 3}, {"vendor": "Summit IT Partners", "period": 8, "total": 302544.33, "invoices": 4}, {"vendor": "Summit IT Partners", "period": 9, "total": 291592.76, "invoices": 3}, {"vendor": "Crestwood Facilities Group", "period": 1, "total": 700422.35, "invoices": 4}, {"vendor": "Crestwood Facilities Group", "period": 2, "total": 676465.87, "invoices": 3}, {"vendor": "Crestwood Facilities Group", "period": 3, "total": 712523.63, "invoices": 3}, {"vendor": "Crestwood Facilities Group", "period": 4, "total": 712438.35, "invoices": 2}, {"vendor": "Crestwood Facilities Group", "period": 5, "total": 721488.32, "invoices": 2}, {"vendor": "Crestwood Facilities Group", "period": 6, "total": 718447.89, "invoices": 3}, {"vendor": "Crestwood Facilities Group", "period": 7, "total": 694940.58, "invoices": 3}, {"vendor": "Crestwood Facilities Group", "period": 8, "total": 698123.4, "invoices": 2}, {"vendor": "Crestwood Facilities Group", "period": 9, "total": 687828.89, "invoices": 4}, {"vendor": "Northstar Logistics", "period": 1, "total": 58689.76, "invoices": 2}, {"vendor": "Northstar Logistics", "period": 2, "total": 61302.27, "invoices": 1}, {"vendor": "Northstar Logistics", "period": 3, "total": 58763.88, "invoices": 2}, {"vendor": "Northstar Logistics", "period": 4, "total": 61104.24, "invoices": 2}, {"vendor": "Northstar Logistics", "period": 5, "total": 61751.66, "invoices": 2}, {"vendor": "Northstar Logistics", "period": 6, "total": 59904.37, "invoices": 1}, {"vendor": "Northstar Logistics", "period": 7, "total": 57198.56, "invoices": 2}, {"vendor": "Northstar Logistics", "period": 8, "total": 60157.36, "invoices": 1}, {"vendor": "Northstar Logistics", "period": 9, "total": 59141.69, "invoices": 1}, {"vendor": "Halsted Legal Advisors", "period": 7, "total": 64666.67, "invoices": 1}, {"vendor": "Halsted Legal Advisors", "period": 8, "total": 64666.67, "invoices": 1}, {"vendor": "Halsted Legal Advisors", "period": 9, "total": 64666.67, "invoices": 1}, {"vendor": "Halsted Legal Advisors", "period": 1, "total": 64666.67, "invoices": 1}, {"vendor": "Halsted Legal Advisors", "period": 2, "total": 64666.67, "invoices": 1}, {"vendor": "Halsted Legal Advisors", "period": 3, "total": 64666.67, "invoices": 1}, {"vendor": "Halsted Legal Advisors", "period": 4, "total": 64666.67, "invoices": 1}, {"vendor": "Halsted Legal Advisors", "period": 5, "total": 64666.67, "invoices": 1}, {"vendor": "Halsted Legal Advisors", "period": 6, "total": 64666.67, "invoices": 1}, {"vendor": "Whitfield & Cole LLP", "period": 7, "total": 68000.0, "invoices": 1}, {"vendor": "Whitfield & Cole LLP", "period": 8, "total": 68000.0, "invoices": 1}, {"vendor": "Whitfield & Cole LLP", "period": 9, "total": 68000.0, "invoices": 1}, {"vendor": "Whitfield & Cole LLP", "period": 1, "total": 52000.0, "invoices": 1}, {"vendor": "Whitfield & Cole LLP", "period": 2, "total": 52000.0, "invoices": 1}, {"vendor": "Whitfield & Cole LLP", "period": 3, "total": 52000.0, "invoices": 1}, {"vendor": "Whitfield & Cole LLP", "period": 4, "total": 52000.0, "invoices": 1}, {"vendor": "Whitfield & Cole LLP", "period": 5, "total": 52000.0, "invoices": 1}, {"vendor": "Whitfield & Cole LLP", "period": 6, "total": 52000.0, "invoices": 1}], "vendorTSO": [{"name": "Vantage Surgical Supply", "invoiced": 7065362.38, "openPO": 240615.57, "openWO": 0.0, "tso": 7305977.95}, {"name": "MedFlow Pharma Distribution", "invoiced": 6684144.47, "openPO": 0, "openWO": 0, "tso": 6684144.47}, {"name": "Crestwood Facilities Group", "invoiced": 6322679.28, "openPO": 56491.87, "openWO": 80845.41, "tso": 6460016.56}, {"name": "Summit IT Partners", "invoiced": 2759479.11, "openPO": 46542.94, "openWO": 0.0, "tso": 2806022.05}, {"name": "Apex Imaging Systems", "invoiced": 2577829.33, "openPO": 0.0, "openWO": 35157.33, "tso": 2612986.66}, {"name": "Halsted Legal Advisors", "invoiced": 582000.03, "openPO": 0, "openWO": 0, "tso": 582000.03}, {"name": "Northstar Logistics", "invoiced": 538013.79, "openPO": 19179.54, "openWO": 0.0, "tso": 557193.33}, {"name": "Whitfield & Cole LLP", "invoiced": 516000.0, "openPO": 0, "openWO": 0, "tso": 516000.0}, {"name": "Pinnacle Pharmacy Equipment", "invoiced": 450900.94, "openPO": 0, "openWO": 0, "tso": 450900.94}], "deptSpend": [{"ccName": "Surgical Services", "ytdBudget": 7274999.97, "annualBudget": 9699999.96, "ytdActual": 7065362.38, "openPO": 240615.57, "openWO": 0.0, "tso": 7305977.95, "variance": -209637.59}, {"ccName": "Pharmacy", "ytdBudget": 7200000.0, "annualBudget": 9600000.0, "ytdActual": 7135045.41, "openPO": 0.0, "openWO": 0.0, "tso": 7135045.41, "variance": -64954.59}, {"ccName": "Facilities", "ytdBudget": 6300000.0, "annualBudget": 8400000.0, "ytdActual": 6322679.28, "openPO": 56491.87, "openWO": 80845.41, "tso": 6460016.56, "variance": 22679.28}, {"ccName": "Information Technology", "ytdBudget": 2775000.06, "annualBudget": 3700000.08, "ytdActual": 2759479.11, "openPO": 46542.94, "openWO": 0.0, "tso": 2806022.05, "variance": -15520.95}, {"ccName": "Biomedical Engineering", "ytdBudget": 1350000.0, "annualBudget": 1800000.0, "ytdActual": 2577829.33, "openPO": 0.0, "openWO": 35157.33, "tso": 2612986.66, "variance": 1227829.33}, {"ccName": "Administration & Legal", "ytdBudget": 1050000.03, "annualBudget": 1400000.04, "ytdActual": 1098000.03, "openPO": 0.0, "openWO": 0.0, "tso": 1098000.03, "variance": 48000.0}, {"ccName": "Procurement", "ytdBudget": 540000.0, "annualBudget": 720000.0, "ytdActual": 538013.79, "openPO": 19179.54, "openWO": 0.0, "tso": 557193.33, "variance": -1986.21}]}, "pinehurst": {"combined": [{"cc": "CC-HR", "ccName": "HR & Staffing", "pc": "PC-LTC", "pcName": "Long-Term Care", "gl": "6910", "glName": "Contract & Temporary Labor", "period": 1, "budget": 200000.0, "actual": 194476.66, "predicted": 197698.91}, {"cc": "CC-HR", "ccName": "HR & Staffing", "pc": "PC-LTC", "pcName": "Long-Term Care", "gl": "6910", "glName": "Contract & Temporary Labor", "period": 2, "budget": 200000.0, "actual": 189448.73, "predicted": 192330.39}, {"cc": "CC-HR", "ccName": "HR & Staffing", "pc": "PC-LTC", "pcName": "Long-Term Care", "gl": "6910", "glName": "Contract & Temporary Labor", "period": 3, "budget": 200000.0, "actual": 206194.08, "predicted": 205240.79}, {"cc": "CC-HR", "ccName": "HR & Staffing", "pc": "PC-LTC", "pcName": "Long-Term Care", "gl": "6910", "glName": "Contract & Temporary Labor", "period": 4, "budget": 200000.0, "actual": 196363.44, "predicted": 197016.21}, {"cc": "CC-HR", "ccName": "HR & Staffing", "pc": "PC-LTC", "pcName": "Long-Term Care", "gl": "6910", "glName": "Contract & Temporary Labor", "period": 5, "budget": 200000.0, "actual": 189182.21, "predicted": 187793.51}, {"cc": "CC-HR", "ccName": "HR & Staffing", "pc": "PC-LTC", "pcName": "Long-Term Care", "gl": "6910", "glName": "Contract & Temporary Labor", "period": 6, "budget": 200000.0, "actual": 199659.94, "predicted": 196754.3}, {"cc": "CC-HR", "ccName": "HR & Staffing", "pc": "PC-LTC", "pcName": "Long-Term Care", "gl": "6910", "glName": "Contract & Temporary Labor", "period": 7, "budget": 200000.0, "actual": 210204.08, "predicted": 200000.0}, {"cc": "CC-HR", "ccName": "HR & Staffing", "pc": "PC-LTC", "pcName": "Long-Term Care", "gl": "6910", "glName": "Contract & Temporary Labor", "period": 8, "budget": 200000.0, "actual": 210204.08, "predicted": 209130.78}, {"cc": "CC-HR", "ccName": "HR & Staffing", "pc": "PC-LTC", "pcName": "Long-Term Care", "gl": "6910", "glName": "Contract & Temporary Labor", "period": 9, "budget": 200000.0, "actual": 210204.08, "predicted": 211278.83}, {"cc": "CC-ADMIN", "ccName": "Administration", "pc": "PC-CORP", "pcName": "Corporate", "gl": "6710", "glName": "Travel & Expense", "period": 1, "budget": 40000.0, "actual": 37786.33, "predicted": 38313.4}, {"cc": "CC-ADMIN", "ccName": "Administration", "pc": "PC-CORP", "pcName": "Corporate", "gl": "6710", "glName": "Travel & Expense", "period": 2, "budget": 40000.0, "actual": 39762.74, "predicted": 40098.68}, {"cc": "CC-ADMIN", "ccName": "Administration", "pc": "PC-CORP", "pcName": "Corporate", "gl": "6710", "glName": "Travel & Expense", "period": 3, "budget": 40000.0, "actual": 39790.98, "predicted": 40507.22}, {"cc": "CC-ADMIN", "ccName": "Administration", "pc": "PC-CORP", "pcName": "Corporate", "gl": "6710", "glName": "Travel & Expense", "period": 4, "budget": 40000.0, "actual": 39585.66, "predicted": 39232.23}, {"cc": "CC-ADMIN", "ccName": "Administration", "pc": "PC-CORP", "pcName": "Corporate", "gl": "6710", "glName": "Travel & Expense", "period": 5, "budget": 40000.0, "actual": 40777.52, "predicted": 40237.84}, {"cc": "CC-ADMIN", "ccName": "Administration", "pc": "PC-CORP", "pcName": "Corporate", "gl": "6710", "glName": "Travel & Expense", "period": 6, "budget": 40000.0, "actual": 39700.78, "predicted": 39622.41}, {"cc": "CC-ADMIN", "ccName": "Administration", "pc": "PC-CORP", "pcName": "Corporate", "gl": "6710", "glName": "Travel & Expense", "period": 7, "budget": 40000.0, "actual": 38259.85, "predicted": 37915.76}, {"cc": "CC-ADMIN", "ccName": "Administration", "pc": "PC-CORP", "pcName": "Corporate", "gl": "6710", "glName": "Travel & Expense", "period": 8, "budget": 40000.0, "actual": 92000.0, "predicted": 40000.0}, {"cc": "CC-ADMIN", "ccName": "Administration", "pc": "PC-CORP", "pcName": "Corporate", "gl": "6710", "glName": "Travel & Expense", "period": 9, "budget": 40000.0, "actual": 39892.1, "predicted": 39435.86}, {"cc": "CC-ADMIN", "ccName": "Administration", "pc": "PC-CORP", "pcName": "Corporate", "gl": "6810", "glName": "Marketing & Communications", "period": 1, "budget": 30000.0, "actual": 31034.04, "predicted": 30927.26}, {"cc": "CC-ADMIN", "ccName": "Administration", "pc": "PC-CORP", "pcName": "Corporate", "gl": "6810", "glName": "Marketing & Communications", "period": 2, "budget": 30000.0, "actual": 31179.29, "predicted": 31336.1}, {"cc": "CC-ADMIN", "ccName": "Administration", "pc": "PC-CORP", "pcName": "Corporate", "gl": "6810", "glName": "Marketing & Communications", "period": 3, "budget": 30000.0, "actual": 28704.15, "predicted": 28697.12}, {"cc": "CC-ADMIN", "ccName": "Administration", "pc": "PC-CORP", "pcName": "Corporate", "gl": "6810", "glName": "Marketing & Communications", "period": 4, "budget": 30000.0, "actual": 30504.7, "predicted": 30279.42}, {"cc": "CC-ADMIN", "ccName": "Administration", "pc": "PC-CORP", "pcName": "Corporate", "gl": "6810", "glName": "Marketing & Communications", "period": 5, "budget": 30000.0, "actual": 30950.44, "predicted": 31370.27}, {"cc": "CC-ADMIN", "ccName": "Administration", "pc": "PC-CORP", "pcName": "Corporate", "gl": "6810", "glName": "Marketing & Communications", "period": 6, "budget": 30000.0, "actual": 30791.96, "predicted": 31385.67}, {"cc": "CC-ADMIN", "ccName": "Administration", "pc": "PC-CORP", "pcName": "Corporate", "gl": "6810", "glName": "Marketing & Communications", "period": 7, "budget": 30000.0, "actual": 28728.65, "predicted": 28674.04}, {"cc": "CC-ADMIN", "ccName": "Administration", "pc": "PC-CORP", "pcName": "Corporate", "gl": "6810", "glName": "Marketing & Communications", "period": 8, "budget": 30000.0, "actual": 30693.28, "predicted": 30171.1}, {"cc": "CC-ADMIN", "ccName": "Administration", "pc": "PC-CORP", "pcName": "Corporate", "gl": "6810", "glName": "Marketing & Communications", "period": 9, "budget": 30000.0, "actual": 28637.02, "predicted": 28100.35}, {"cc": "CC-FAC", "ccName": "Facilities", "pc": "PC-CORP", "pcName": "Corporate", "gl": "6010", "glName": "Facilities Management Services", "period": 1, "budget": 100000.0, "actual": 103518.86, "predicted": 105062.65}, {"cc": "CC-FAC", "ccName": "Facilities", "pc": "PC-CORP", "pcName": "Corporate", "gl": "6010", "glName": "Facilities Management Services", "period": 2, "budget": 100000.0, "actual": 94673.48, "predicted": 92937.12}, {"cc": "CC-FAC", "ccName": "Facilities", "pc": "PC-CORP", "pcName": "Corporate", "gl": "6010", "glName": "Facilities Management Services", "period": 3, "budget": 100000.0, "actual": 97400.54, "predicted": 98213.37}, {"cc": "CC-FAC", "ccName": "Facilities", "pc": "PC-CORP", "pcName": "Corporate", "gl": "6010", "glName": "Facilities Management Services", "period": 4, "budget": 100000.0, "actual": 95512.65, "predicted": 95782.31}, {"cc": "CC-FAC", "ccName": "Facilities", "pc": "PC-CORP", "pcName": "Corporate", "gl": "6010", "glName": "Facilities Management Services", "period": 5, "budget": 100000.0, "actual": 94703.16, "predicted": 93979.74}, {"cc": "CC-FAC", "ccName": "Facilities", "pc": "PC-CORP", "pcName": "Corporate", "gl": "6010", "glName": "Facilities Management Services", "period": 6, "budget": 100000.0, "actual": 96522.58, "predicted": 97648.09}, {"cc": "CC-FAC", "ccName": "Facilities", "pc": "PC-CORP", "pcName": "Corporate", "gl": "6010", "glName": "Facilities Management Services", "period": 7, "budget": 100000.0, "actual": 98838.35, "predicted": 96937.15}, {"cc": "CC-FAC", "ccName": "Facilities", "pc": "PC-CORP", "pcName": "Corporate", "gl": "6010", "glName": "Facilities Management Services", "period": 8, "budget": 100000.0, "actual": 97426.36, "predicted": 96007.37}, {"cc": "CC-FAC", "ccName": "Facilities", "pc": "PC-CORP", "pcName": "Corporate", "gl": "6010", "glName": "Facilities Management Services", "period": 9, "budget": 100000.0, "actual": 95466.03, "predicted": 95293.55}, {"cc": "CC-FAC", "ccName": "Facilities", "pc": "PC-CORP", "pcName": "Corporate", "gl": "6020", "glName": "Utilities", "period": 1, "budget": 50000.0, "actual": 50480.98, "predicted": 49521.29}, {"cc": "CC-FAC", "ccName": "Facilities", "pc": "PC-CORP", "pcName": "Corporate", "gl": "6020", "glName": "Utilities", "period": 2, "budget": 50000.0, "actual": 50895.28, "predicted": 51566.42}, {"cc": "CC-FAC", "ccName": "Facilities", "pc": "PC-CORP", "pcName": "Corporate", "gl": "6020", "glName": "Utilities", "period": 3, "budget": 50000.0, "actual": 47999.59, "predicted": 47495.42}, {"cc": "CC-FAC", "ccName": "Facilities", "pc": "PC-CORP", "pcName": "Corporate", "gl": "6020", "glName": "Utilities", "period": 4, "budget": 50000.0, "actual": 50462.61, "predicted": 49737.71}, {"cc": "CC-FAC", "ccName": "Facilities", "pc": "PC-CORP", "pcName": "Corporate", "gl": "6020", "glName": "Utilities", "period": 5, "budget": 50000.0, "actual": 49350.4, "predicted": 48456.06}, {"cc": "CC-FAC", "ccName": "Facilities", "pc": "PC-CORP", "pcName": "Corporate", "gl": "6020", "glName": "Utilities", "period": 6, "budget": 50000.0, "actual": 47423.89, "predicted": 47668.94}, {"cc": "CC-FAC", "ccName": "Facilities", "pc": "PC-CORP", "pcName": "Corporate", "gl": "6020", "glName": "Utilities", "period": 7, "budget": 50000.0, "actual": 50750.7, "predicted": 50642.05}, {"cc": "CC-FAC", "ccName": "Facilities", "pc": "PC-CORP", "pcName": "Corporate", "gl": "6020", "glName": "Utilities", "period": 8, "budget": 50000.0, "actual": 48979.19, "predicted": 49233.81}, {"cc": "CC-FAC", "ccName": "Facilities", "pc": "PC-CORP", "pcName": "Corporate", "gl": "6020", "glName": "Utilities", "period": 9, "budget": 50000.0, "actual": 47755.75, "predicted": 48051.92}, {"cc": "CC-NURSE", "ccName": "Nursing", "pc": "PC-HH", "pcName": "Home Health", "gl": "6310", "glName": "Medical/Surgical Supplies", "period": 1, "budget": 116666.67, "actual": 111485.65, "predicted": 112856.41}, {"cc": "CC-NURSE", "ccName": "Nursing", "pc": "PC-HH", "pcName": "Home Health", "gl": "6310", "glName": "Medical/Surgical Supplies", "period": 2, "budget": 116666.67, "actual": 117246.21, "predicted": 119396.32}, {"cc": "CC-NURSE", "ccName": "Nursing", "pc": "PC-HH", "pcName": "Home Health", "gl": "6310", "glName": "Medical/Surgical Supplies", "period": 3, "budget": 116666.67, "actual": 119305.15, "predicted": 120185.59}, {"cc": "CC-NURSE", "ccName": "Nursing", "pc": "PC-HH", "pcName": "Home Health", "gl": "6310", "glName": "Medical/Surgical Supplies", "period": 4, "budget": 116666.67, "actual": 113084.61, "predicted": 111724.62}, {"cc": "CC-NURSE", "ccName": "Nursing", "pc": "PC-HH", "pcName": "Home Health", "gl": "6310", "glName": "Medical/Surgical Supplies", "period": 5, "budget": 116666.67, "actual": 114555.15, "predicted": 114441.25}, {"cc": "CC-NURSE", "ccName": "Nursing", "pc": "PC-HH", "pcName": "Home Health", "gl": "6310", "glName": "Medical/Surgical Supplies", "period": 6, "budget": 116666.67, "actual": 120139.89, "predicted": 118595.79}, {"cc": "CC-NURSE", "ccName": "Nursing", "pc": "PC-HH", "pcName": "Home Health", "gl": "6310", "glName": "Medical/Surgical Supplies", "period": 7, "budget": 116666.67, "actual": 118725.91, "predicted": 116402.52}, {"cc": "CC-NURSE", "ccName": "Nursing", "pc": "PC-HH", "pcName": "Home Health", "gl": "6310", "glName": "Medical/Surgical Supplies", "period": 8, "budget": 116666.67, "actual": 115190.75, "predicted": 115062.66}, {"cc": "CC-NURSE", "ccName": "Nursing", "pc": "PC-HH", "pcName": "Home Health", "gl": "6310", "glName": "Medical/Surgical Supplies", "period": 9, "budget": 116666.67, "actual": 115714.07, "predicted": 116705.37}, {"cc": "CC-IT", "ccName": "Information Technology", "pc": "PC-CORP", "pcName": "Corporate", "gl": "6110", "glName": "Software Subscriptions & Licensing", "period": 1, "budget": 40000.0, "actual": 37768.8, "predicted": 37284.0}, {"cc": "CC-IT", "ccName": "Information Technology", "pc": "PC-CORP", "pcName": "Corporate", "gl": "6110", "glName": "Software Subscriptions & Licensing", "period": 2, "budget": 40000.0, "actual": 40639.97, "predicted": 40269.91}, {"cc": "CC-IT", "ccName": "Information Technology", "pc": "PC-CORP", "pcName": "Corporate", "gl": "6110", "glName": "Software Subscriptions & Licensing", "period": 3, "budget": 40000.0, "actual": 41493.44, "predicted": 41237.41}, {"cc": "CC-IT", "ccName": "Information Technology", "pc": "PC-CORP", "pcName": "Corporate", "gl": "6110", "glName": "Software Subscriptions & Licensing", "period": 4, "budget": 40000.0, "actual": 39733.14, "predicted": 40046.73}, {"cc": "CC-IT", "ccName": "Information Technology", "pc": "PC-CORP", "pcName": "Corporate", "gl": "6110", "glName": "Software Subscriptions & Licensing", "period": 5, "budget": 40000.0, "actual": 40960.0, "predicted": 40993.46}, {"cc": "CC-IT", "ccName": "Information Technology", "pc": "PC-CORP", "pcName": "Corporate", "gl": "6110", "glName": "Software Subscriptions & Licensing", "period": 6, "budget": 40000.0, "actual": 39368.47, "predicted": 39548.7}, {"cc": "CC-IT", "ccName": "Information Technology", "pc": "PC-CORP", "pcName": "Corporate", "gl": "6110", "glName": "Software Subscriptions & Licensing", "period": 7, "budget": 40000.0, "actual": 38450.76, "predicted": 38844.81}, {"cc": "CC-IT", "ccName": "Information Technology", "pc": "PC-CORP", "pcName": "Corporate", "gl": "6110", "glName": "Software Subscriptions & Licensing", "period": 8, "budget": 40000.0, "actual": 41131.33, "predicted": 40956.14}, {"cc": "CC-IT", "ccName": "Information Technology", "pc": "PC-CORP", "pcName": "Corporate", "gl": "6110", "glName": "Software Subscriptions & Licensing", "period": 9, "budget": 40000.0, "actual": 38245.87, "predicted": 38692.48}, {"cc": "CC-AP", "ccName": "Accounts Payable", "pc": "PC-CORP", "pcName": "Corporate", "gl": "6520", "glName": "Office & Admin Supplies", "period": 1, "budget": 10000.0, "actual": 9492.19, "predicted": 9646.43}, {"cc": "CC-AP", "ccName": "Accounts Payable", "pc": "PC-CORP", "pcName": "Corporate", "gl": "6520", "glName": "Office & Admin Supplies", "period": 2, "budget": 10000.0, "actual": 9917.43, "predicted": 9753.68}, {"cc": "CC-AP", "ccName": "Accounts Payable", "pc": "PC-CORP", "pcName": "Corporate", "gl": "6520", "glName": "Office & Admin Supplies", "period": 3, "budget": 10000.0, "actual": 9671.92, "predicted": 9839.28}, {"cc": "CC-AP", "ccName": "Accounts Payable", "pc": "PC-CORP", "pcName": "Corporate", "gl": "6520", "glName": "Office & Admin Supplies", "period": 4, "budget": 10000.0, "actual": 10219.78, "predicted": 10310.69}, {"cc": "CC-AP", "ccName": "Accounts Payable", "pc": "PC-CORP", "pcName": "Corporate", "gl": "6520", "glName": "Office & Admin Supplies", "period": 5, "budget": 10000.0, "actual": 10199.59, "predicted": 10048.6}, {"cc": "CC-AP", "ccName": "Accounts Payable", "pc": "PC-CORP", "pcName": "Corporate", "gl": "6520", "glName": "Office & Admin Supplies", "period": 6, "budget": 10000.0, "actual": 10338.35, "predicted": 10319.14}, {"cc": "CC-AP", "ccName": "Accounts Payable", "pc": "PC-CORP", "pcName": "Corporate", "gl": "6520", "glName": "Office & Admin Supplies", "period": 7, "budget": 10000.0, "actual": 10256.23, "predicted": 10307.74}, {"cc": "CC-AP", "ccName": "Accounts Payable", "pc": "PC-CORP", "pcName": "Corporate", "gl": "6520", "glName": "Office & Admin Supplies", "period": 8, "budget": 10000.0, "actual": 9853.77, "predicted": 10015.36}, {"cc": "CC-AP", "ccName": "Accounts Payable", "pc": "PC-CORP", "pcName": "Corporate", "gl": "6520", "glName": "Office & Admin Supplies", "period": 9, "budget": 10000.0, "actual": 10109.54, "predicted": 10059.72}], "vendors": [{"name": "CareStaff Solutions", "total": 1805937.3, "invoices": 12}, {"name": "Pinehurst Facilities Co", "total": 1318160.4, "invoices": 29}, {"name": "Heritage Medical Supply", "total": 1045447.39, "invoices": 11}, {"name": "SkyLine Travel Partners", "total": 407555.96, "invoices": 15}, {"name": "Cloudset Software", "total": 357791.78, "invoices": 13}, {"name": "Bristol Marketing Group", "total": 271223.53, "invoices": 14}, {"name": "Oakdale Office Supply", "total": 90058.8, "invoices": 13}], "contracts": [{"contract_id": "C-610", "vendor_name": "CareStaff Solutions", "vendor_ein": "71-1234567", "contract_name": "Contract & Temporary Nursing Staffing Agreement", "category": "Contract & Temporary Labor", "cost_center_code": "CC-HR", "profit_center_code": "PC-LTC", "gl_code": "6910", "start_date": "2024-01-01", "end_date": "2026-12-31", "contracted_terms": "2/10 Net 30 (2% discount if paid within 10 days), 1.5%/month late fee after 30 days", "annual_value_estimate": "2400000", "renewal_notice_days": "60", "auto_renew": "Yes", "notes": "AP processing backlog in Q3 2026 caused invoices to be paid 75-90 days after receipt, missing the early-payment discount and triggering late fees on a recurring monthly invoice (lost discount + late fee variance)."}, {"contract_id": "C-650", "vendor_name": "Pinehurst Facilities Co", "vendor_ein": "73-3456789", "contract_name": "Facilities Management & Utilities Agreement", "category": "Facilities Management Services", "cost_center_code": "CC-FAC", "profit_center_code": "PC-CORP", "gl_code": "6010", "start_date": "2023-06-01", "end_date": "2026-12-31", "contracted_terms": "Fixed monthly fee plus utilities pass-through", "annual_value_estimate": "1200000", "renewal_notice_days": "90", "auto_renew": "No", "notes": "Contract expires Dec 31, 2026 (93 days from Sept 30, 2026). Renewal notice deadline is Oct 2, 2026 (60 days prior)."}, {"contract_id": "C-660", "vendor_name": "Heritage Medical Supply", "vendor_ein": "74-4567890", "contract_name": "Home Health Medical Supply Agreement", "category": "Medical/Surgical Supplies", "cost_center_code": "CC-NURSE", "profit_center_code": "PC-HH", "gl_code": "6310", "start_date": "2024-03-01", "end_date": "2027-02-28", "contracted_terms": "Negotiated unit pricing schedule", "annual_value_estimate": "1400000", "renewal_notice_days": "60", "auto_renew": "Yes", "notes": ""}, {"contract_id": "C-670", "vendor_name": "Cloudset Software", "vendor_ein": "75-5678901", "contract_name": "Practice Management Software Subscription", "category": "Software Subscriptions & Licensing", "cost_center_code": "CC-IT", "profit_center_code": "PC-CORP", "gl_code": "6110", "start_date": "2025-05-01", "end_date": "2027-04-30", "contracted_terms": "Monthly subscription", "annual_value_estimate": "480000", "renewal_notice_days": "30", "auto_renew": "Yes", "notes": ""}], "forecast": [{"cc": "CC-HR", "ccName": "HR & Staffing", "gl": "6910", "glName": "Contract & Temporary Labor", "ytdActual": 1805937.3, "annualBudget": 2400000.0, "runRateMonthly": 210204.08, "projectedQ4": 630612.24, "projectedFY": 2436549.54, "projectedVariance": 36549.54, "hasOneTimeAnomaly": false, "anomalyMonth": null, "adjRunRateMonthly": 210204.08, "adjProjectedQ4": 630612.24, "adjProjectedFY": 2436549.54, "adjProjectedVariance": 36549.54}, {"cc": "CC-ADMIN", "ccName": "Administration", "gl": "6710", "glName": "Travel & Expense", "ytdActual": 407555.96, "annualBudget": 480000.0, "runRateMonthly": 56717.32, "projectedQ4": 170151.95, "projectedFY": 577707.91, "projectedVariance": 97707.91, "hasOneTimeAnomaly": true, "anomalyMonth": 8, "adjRunRateMonthly": 39075.97, "adjProjectedQ4": 117227.92, "adjProjectedFY": 524783.88, "adjProjectedVariance": 44783.88}, {"cc": "CC-ADMIN", "ccName": "Administration", "gl": "6810", "glName": "Marketing & Communications", "ytdActual": 271223.53, "annualBudget": 360000.0, "runRateMonthly": 29352.98, "projectedQ4": 88058.95, "projectedFY": 359282.48, "projectedVariance": -717.52, "hasOneTimeAnomaly": false, "anomalyMonth": null, "adjRunRateMonthly": 29352.98, "adjProjectedQ4": 88058.95, "adjProjectedFY": 359282.48, "adjProjectedVariance": -717.52}, {"cc": "CC-FAC", "ccName": "Facilities", "gl": "6010", "glName": "Facilities Management Services", "ytdActual": 874062.01, "annualBudget": 1200000.0, "runRateMonthly": 97243.58, "projectedQ4": 291730.74, "projectedFY": 1165792.75, "projectedVariance": -34207.25, "hasOneTimeAnomaly": false, "anomalyMonth": null, "adjRunRateMonthly": 97243.58, "adjProjectedQ4": 291730.74, "adjProjectedFY": 1165792.75, "adjProjectedVariance": -34207.25}, {"cc": "CC-FAC", "ccName": "Facilities", "gl": "6020", "glName": "Utilities", "ytdActual": 444098.39, "annualBudget": 600000.0, "runRateMonthly": 49161.88, "projectedQ4": 147485.64, "projectedFY": 591584.03, "projectedVariance": -8415.97, "hasOneTimeAnomaly": false, "anomalyMonth": null, "adjRunRateMonthly": 49161.88, "adjProjectedQ4": 147485.64, "adjProjectedFY": 591584.03, "adjProjectedVariance": -8415.97}, {"cc": "CC-NURSE", "ccName": "Nursing", "gl": "6310", "glName": "Medical/Surgical Supplies", "ytdActual": 1045447.39, "annualBudget": 1400000.04, "runRateMonthly": 116543.58, "projectedQ4": 349630.73, "projectedFY": 1395078.12, "projectedVariance": -4921.92, "hasOneTimeAnomaly": false, "anomalyMonth": null, "adjRunRateMonthly": 116543.58, "adjProjectedQ4": 349630.73, "adjProjectedFY": 1395078.12, "adjProjectedVariance": -4921.92}, {"cc": "CC-IT", "ccName": "Information Technology", "gl": "6110", "glName": "Software Subscriptions & Licensing", "ytdActual": 357791.78, "annualBudget": 480000.0, "runRateMonthly": 39275.99, "projectedQ4": 117827.96, "projectedFY": 475619.74, "projectedVariance": -4380.26, "hasOneTimeAnomaly": false, "anomalyMonth": null, "adjRunRateMonthly": 39275.99, "adjProjectedQ4": 117827.96, "adjProjectedFY": 475619.74, "adjProjectedVariance": -4380.26}, {"cc": "CC-AP", "ccName": "Accounts Payable", "gl": "6520", "glName": "Office & Admin Supplies", "ytdActual": 90058.8, "annualBudget": 120000.0, "runRateMonthly": 10073.18, "projectedQ4": 30219.54, "projectedFY": 120278.34, "projectedVariance": 278.34, "hasOneTimeAnomaly": false, "anomalyMonth": null, "adjRunRateMonthly": 10073.18, "adjProjectedQ4": 30219.54, "adjProjectedFY": 120278.34, "adjProjectedVariance": 278.34}], "vendorsByPeriod": [{"vendor": "CareStaff Solutions", "period": 1, "total": 194476.66, "invoices": 1}, {"vendor": "CareStaff Solutions", "period": 2, "total": 189448.73, "invoices": 1}, {"vendor": "CareStaff Solutions", "period": 3, "total": 206194.08, "invoices": 1}, {"vendor": "CareStaff Solutions", "period": 4, "total": 196363.44, "invoices": 1}, {"vendor": "CareStaff Solutions", "period": 5, "total": 189182.21, "invoices": 1}, {"vendor": "CareStaff Solutions", "period": 6, "total": 199659.94, "invoices": 1}, {"vendor": "CareStaff Solutions", "period": 7, "total": 210204.08, "invoices": 2}, {"vendor": "CareStaff Solutions", "period": 8, "total": 210204.08, "invoices": 2}, {"vendor": "CareStaff Solutions", "period": 9, "total": 210204.08, "invoices": 2}, {"vendor": "SkyLine Travel Partners", "period": 1, "total": 37786.33, "invoices": 1}, {"vendor": "SkyLine Travel Partners", "period": 2, "total": 39762.74, "invoices": 2}, {"vendor": "SkyLine Travel Partners", "period": 3, "total": 39790.98, "invoices": 1}, {"vendor": "SkyLine Travel Partners", "period": 4, "total": 39585.66, "invoices": 2}, {"vendor": "SkyLine Travel Partners", "period": 5, "total": 40777.52, "invoices": 1}, {"vendor": "SkyLine Travel Partners", "period": 6, "total": 39700.78, "invoices": 2}, {"vendor": "SkyLine Travel Partners", "period": 7, "total": 38259.85, "invoices": 2}, {"vendor": "SkyLine Travel Partners", "period": 9, "total": 39892.1, "invoices": 2}, {"vendor": "SkyLine Travel Partners", "period": 8, "total": 92000.0, "invoices": 2}, {"vendor": "Bristol Marketing Group", "period": 1, "total": 31034.04, "invoices": 2}, {"vendor": "Bristol Marketing Group", "period": 2, "total": 31179.29, "invoices": 2}, {"vendor": "Bristol Marketing Group", "period": 3, "total": 28704.15, "invoices": 1}, {"vendor": "Bristol Marketing Group", "period": 4, "total": 30504.7, "invoices": 1}, {"vendor": "Bristol Marketing Group", "period": 5, "total": 30950.44, "invoices": 2}, {"vendor": "Bristol Marketing Group", "period": 6, "total": 30791.96, "invoices": 2}, {"vendor": "Bristol Marketing Group", "period": 7, "total": 28728.65, "invoices": 1}, {"vendor": "Bristol Marketing Group", "period": 8, "total": 30693.28, "invoices": 1}, {"vendor": "Bristol Marketing Group", "period": 9, "total": 28637.02, "invoices": 2}, {"vendor": "Pinehurst Facilities Co", "period": 1, "total": 153999.84, "invoices": 4}, {"vendor": "Pinehurst Facilities Co", "period": 2, "total": 145568.76, "invoices": 3}, {"vendor": "Pinehurst Facilities Co", "period": 3, "total": 145400.13, "invoices": 3}, {"vendor": "Pinehurst Facilities Co", "period": 4, "total": 145975.26, "invoices": 3}, {"vendor": "Pinehurst Facilities Co", "period": 5, "total": 144053.56, "invoices": 3}, {"vendor": "Pinehurst Facilities Co", "period": 6, "total": 143946.47, "invoices": 3}, {"vendor": "Pinehurst Facilities Co", "period": 7, "total": 149589.05, "invoices": 3}, {"vendor": "Pinehurst Facilities Co", "period": 8, "total": 146405.55, "invoices": 4}, {"vendor": "Pinehurst Facilities Co", "period": 9, "total": 143221.78, "invoices": 3}, {"vendor": "Heritage Medical Supply", "period": 1, "total": 111485.65, "invoices": 1}, {"vendor": "Heritage Medical Supply", "period": 2, "total": 117246.21, "invoices": 1}, {"vendor": "Heritage Medical Supply", "period": 3, "total": 119305.15, "invoices": 1}, {"vendor": "Heritage Medical Supply", "period": 4, "total": 113084.61, "invoices": 1}, {"vendor": "Heritage Medical Supply", "period": 5, "total": 114555.15, "invoices": 1}, {"vendor": "Heritage Medical Supply", "period": 6, "total": 120139.89, "invoices": 2}, {"vendor": "Heritage Medical Supply", "period": 7, "total": 118725.91, "invoices": 1}, {"vendor": "Heritage Medical Supply", "period": 8, "total": 115190.75, "invoices": 1}, {"vendor": "Heritage Medical Supply", "period": 9, "total": 115714.07, "invoices": 2}, {"vendor": "Cloudset Software", "period": 1, "total": 37768.8, "invoices": 1}, {"vendor": "Cloudset Software", "period": 2, "total": 40639.97, "invoices": 1}, {"vendor": "Cloudset Software", "period": 3, "total": 41493.44, "invoices": 1}, {"vendor": "Cloudset Software", "period": 4, "total": 39733.14, "invoices": 2}, {"vendor": "Cloudset Software", "period": 5, "total": 40960.0, "invoices": 1}, {"vendor": "Cloudset Software", "period": 6, "total": 39368.47, "invoices": 1}, {"vendor": "Cloudset Software", "period": 7, "total": 38450.76, "invoices": 2}, {"vendor": "Cloudset Software", "period": 8, "total": 41131.33, "invoices": 2}, {"vendor": "Cloudset Software", "period": 9, "total": 38245.87, "invoices": 2}, {"vendor": "Oakdale Office Supply", "period": 1, "total": 9492.19, "invoices": 2}, {"vendor": "Oakdale Office Supply", "period": 2, "total": 9917.43, "invoices": 2}, {"vendor": "Oakdale Office Supply", "period": 3, "total": 9671.92, "invoices": 1}, {"vendor": "Oakdale Office Supply", "period": 4, "total": 10219.78, "invoices": 2}, {"vendor": "Oakdale Office Supply", "period": 5, "total": 10199.59, "invoices": 1}, {"vendor": "Oakdale Office Supply", "period": 6, "total": 10338.35, "invoices": 1}, {"vendor": "Oakdale Office Supply", "period": 7, "total": 10256.23, "invoices": 1}, {"vendor": "Oakdale Office Supply", "period": 8, "total": 9853.77, "invoices": 2}, {"vendor": "Oakdale Office Supply", "period": 9, "total": 10109.54, "invoices": 1}], "vendorTSO": [{"name": "CareStaff Solutions", "invoiced": 1805937.3, "openPO": 73074.84, "openWO": 0.0, "tso": 1879012.14}, {"name": "Pinehurst Facilities Co", "invoiced": 1318160.4, "openPO": 0.0, "openWO": 28423.55, "tso": 1346583.95}, {"name": "Heritage Medical Supply", "invoiced": 1045447.39, "openPO": 20500.76, "openWO": 0.0, "tso": 1065948.15}, {"name": "SkyLine Travel Partners", "invoiced": 407555.96, "openPO": 0, "openWO": 0, "tso": 407555.96}, {"name": "Cloudset Software", "invoiced": 357791.78, "openPO": 8184.35, "openWO": 0.0, "tso": 365976.13}, {"name": "Bristol Marketing Group", "invoiced": 271223.53, "openPO": 7410.71, "openWO": 0.0, "tso": 278634.24}, {"name": "Oakdale Office Supply", "invoiced": 90058.8, "openPO": 0, "openWO": 0, "tso": 90058.8}], "deptSpend": [{"ccName": "HR & Staffing", "ytdBudget": 1800000.0, "annualBudget": 2400000.0, "ytdActual": 1805937.3, "openPO": 73074.84, "openWO": 0.0, "tso": 1879012.14, "variance": 5937.3}, {"ccName": "Facilities", "ytdBudget": 1350000.0, "annualBudget": 1800000.0, "ytdActual": 1318160.4, "openPO": 0.0, "openWO": 28423.55, "tso": 1346583.95, "variance": -31839.6}, {"ccName": "Nursing", "ytdBudget": 1050000.03, "annualBudget": 1400000.04, "ytdActual": 1045447.39, "openPO": 20500.76, "openWO": 0.0, "tso": 1065948.15, "variance": -4552.64}, {"ccName": "Administration", "ytdBudget": 630000.0, "annualBudget": 840000.0, "ytdActual": 678779.49, "openPO": 7410.71, "openWO": 0.0, "tso": 686190.2, "variance": 48779.49}, {"ccName": "Information Technology", "ytdBudget": 360000.0, "annualBudget": 480000.0, "ytdActual": 357791.78, "openPO": 8184.35, "openWO": 0.0, "tso": 365976.13, "variance": -2208.22}, {"ccName": "Accounts Payable", "ytdBudget": 90000.0, "annualBudget": 120000.0, "ytdActual": 90058.8, "openPO": 0.0, "openWO": 0.0, "tso": 90058.8, "variance": 58.8}]}};
const pct = (n) => (n >= 0 ? "+" : "") + (n * 100).toFixed(1) + "%";
const daysUntil = (dateStr) => Math.round((new Date(dateStr) - TODAY) / 86400000);
const TODAY = new Date("2026-09-30");
const fmtUSD = (n) => "$" + Math.round(n).toLocaleString("en-US");
const fmtUSDk = (n) => {
  if (Math.abs(n) >= 1000000) return "$" + (n / 1000000).toFixed(2) + "M";
  if (Math.abs(n) >= 1000) return "$" + Math.round(n / 1000) + "K";
  return "$" + Math.round(n);
};

// ---------------------------------------------------------------------------
// THEME
// ---------------------------------------------------------------------------
const COLORS = {
  bg: "#F4F8F8", panel: "#FFFFFF", navy: "#0E2A38", navyLight: "#1C4356",
  teal: "#0F8B8D", tealLight: "#5FC8C4", tealPale: "#E3F3F2",
  text: "#13242B", muted: "#6E8088", border: "#E2EBEC",
  alert: "#D6604D", alertPale: "#FBE9E6", good: "#3F9E7A", goodPale: "#E6F4ED",
  amber: "#D9A14B", amberPale: "#FCF1DE",
};

const ENGINES = [
  { id: "recon", n: "01", name: "Reconciliation Intelligence", tag: "Real-time GL monitoring & variance prediction" },
  { id: "causal", n: "02", name: "Causal Spend Analysis", tag: "Why spending changed" },
  { id: "budget", n: "03", name: "Budget & Intent Alignment", tag: "Plan vs. commitment vs. actual" },
  { id: "vendor", n: "04", name: "Vendor & Market Intelligence", tag: "Supplier relationships & renegotiation" },
  { id: "forecast", n: "05", name: "Financial Forecasting", tag: "Renewal cliffs & spend trajectories" },
  { id: "dept", n: "06", name: "Department Budget Intelligence", tag: "Operational leader self-service view" },
];

// ---------------------------------------------------------------------------
// COMPANY META + STORY CONFIG
// ---------------------------------------------------------------------------
const COMPANIES = [
  { id: "cascade", name: "Cascade Health Network", blurb: "Mid-size regional health system" },
  { id: "brightline", name: "Brightline Medical Center", blurb: "Large academic medical center" },
  { id: "pinehurst", name: "Pinehurst Community Health", blurb: "Community hospital network" },
];

// Each story is tied to a specific (cc, gl) line. "extras" are the named
// drivers of variance, with a dollar amount per affected month. The
// remainder of actual spend in any selected period is "within-plan".
const STORIES = {
  cascade: {
    flagMap: { "CC-100|6010": "causal", "CC-200|6110": "budget", "CC-500|6420": "budget" },
    causal: [
      {
        id: "A",
        title: "Facilities Management Services",
        path: "CC-100 Facilities \u2192 PC-CORP Corporate Shared Services \u2192 GL 6010",
        cc: "CC-100", gl: "6010",
        extras: [
          { label: "Approved scope expansion (HVAC, new wings)", color: COLORS.teal, byMonth: { 7: 150000, 8: 150000, 9: 150000 } },
          { label: "Rate overage vs. contract", color: COLORS.alert, byMonth: { 7: 44415, 8: 47250, 9: 51030 } },
        ],
        table: {
          columns: ["Invoice Period", "Hours Billed", "Billed Rate", "Contracted Rate (C-201)", "Overage", "Overage Amount"],
          rows: [
            { period: 7, cells: ["July 2026", "1,890", "$208.50/hr", "$185.00/hr", "+12.7%", "$44,415"] },
            { period: 8, cells: ["August 2026", "1,890", "$210.00/hr", "$185.00/hr", "+13.5%", "$47,250"] },
            { period: 9, cells: ["September 2026", "1,890", "$212.00/hr", "$185.00/hr", "+14.6%", "$51,030"] },
          ],
        },
        narrative: "Facilities spend runs hot whenever this GL line is in scope: $450,000/quarter (when active) reflects approved scope expansion under Contract C-201, 24/7 HVAC monitoring across the East and West wing additions, approved via amendment in June 2026. On top of that, Sterling Facilities Group has billed 12.7% to 14.6% above the $185/hr contract rate every month since July. Recommend flagging the rate variance for vendor discussion ahead of the Q4 invoice cycle.",
      },
    ],
    budget: [
      {
        id: "B",
        title: "Software Subscriptions & Licensing",
        path: "CC-200 Information Technology \u2192 PC-CORP Corporate Shared Services \u2192 GL 6110",
        cc: "CC-200", gl: "6110",
        extras: [
          { label: "Annual renewal (timing mismatch)", color: COLORS.teal, byMonth: { 7: 340000 } },
          { label: "Off-contract spend (Quickline)", color: COLORS.alert, byMonth: { 7: 60000, 8: 60000, 9: 60000 } },
        ],
        narrative: "July's spike is explained by an annual software license renewal from Northgate Software Solutions, invoiced in full against a budget spread evenly across the year, a timing issue, not a true overage. Separately, $60,000/month has gone to Quickline IT Supplies since July with no contract or vendor agreement on file. Recommend reviewing the Quickline relationship for a formal agreement or sourcing alternative.",
      },
      {
        id: "C",
        title: "Medical/Surgical Supplies \u2014 hidden inside an on-budget total",
        path: "CC-400 Nursing Operations \u2192 PC-INPT Inpatient Care \u2192 GL 6310",
        cc: "CC-400", gl: "6310",
        extras: [
          { label: "QuickMed Retail (no contract, emergency)", color: COLORS.alert, byMonth: { 8: 35000 } },
        ],
        hiddenPremium: { label: "Avoidable Premium (vs. GPO equivalent)", byMonth: { 8: 10000 } },
        narrative: "August's Medical/Surgical Supplies total lands almost exactly on budget, which a simple variance report would wave through. But $35,000 of that went to QuickMed Retail, a non-contract vendor, to cover an emergency glove and syringe shortage after Meridian Medical Supply (the GPO contract, C-305) could only partially fulfill the order. The same items at GPO pricing would have cost approximately $25,000. That's a $10,000 avoidable premium, a 40% markup, hidden inside a total that nets to plan.",
      },
      {
        id: "I",
        title: "Logistics & Distribution \u2014 Unauthorized Recurring Fees",
        path: "CC-500 Supply Chain \u2192 PC-OUTPT Outpatient Clinics \u2192 GL 6420",
        cc: "CC-500", gl: "6420",
        extras: [
          { label: "Admin processing fee + fuel surcharge (not in contract)", color: COLORS.alert, byMonth: { 1: 1100, 2: 1100, 3: 1100, 4: 1100, 5: 1100, 6: 1100, 7: 1100, 8: 1100, 9: 1100 } },
        ],
        narrative: "Every Crestline Office Supply invoice against this GL line carries a flat $450 \"administrative processing fee\" plus a roughly 2% \"fuel surcharge\", together about $1,100/month. Neither charge appears in the underlying purchasing agreement, and individually each is small enough to stay under the variance threshold every single month, about 3.4% of this line's budget. Across nine months that's roughly $9,900 in fees with no corresponding service, a textbook case of a charge that's invisible at the GL-line level but adds up at the vendor level.",
      },
    ],
    vendorFlags: {
      "Sterling Facilities Group": { tone: "alert", label: "Rate renegotiation opportunity" },
      "Quickline IT Supplies": { tone: "amber", label: "No contract on file" },
      "Meridian Medical Supply": { tone: "amber", label: "Contract expiring soon" },
      "QuickMed Retail": { tone: "alert", label: "Maverick spend, no contract" },
      "Crestline Office Supply": { tone: "amber", label: "Unauthorized recurring fees" },
    },
    benchmarks: [
      {
        vendor: "Sterling Facilities Group", category: "Facilities Management Services (GL 6010)", status: "above",
        contractedRate: "$185.00/hr", currentRate: "$210.17/hr (Q3 avg)",
        benchmarkRange: "$178\u2013$195/hr across 3 comparable regional facilities-management vendors with similar 24/7 HVAC monitoring scope",
        alternatives: [{ name: "Meridian Facilities Partners", rate: "$182/hr" }, { name: "CoreTech Building Services", rate: "$191/hr" }],
        savingsNote: "Returning to the $185/hr contracted rate would have saved $142,695 across Q3 alone.",
      },
      {
        vendor: "Northgate Software Solutions", category: "Software Subscriptions & Licensing (GL 6110)", status: "at",
        contractedRate: "$340,000/yr license fee", currentRate: "$340,000/yr",
        benchmarkRange: "$280K\u2013$360K/yr for comparable EHR-adjacent enterprise modules",
        savingsNote: "Pricing is within market range. The issue here is timing (annual lump sum vs. monthly budget) and unrelated off-contract Quickline spend, not the Northgate rate itself.",
      },
      {
        vendor: "Crestline Office Supply", category: "Logistics & Distribution (GL 6420)", status: "above",
        contractedRate: "No fees specified", currentRate: "$450/invoice admin fee + ~2% fuel surcharge",
        benchmarkRange: "Comparable office/logistics vendors in this category charge no per-invoice processing fee and a fuel surcharge of 0\u20131% where applicable",
        savingsNote: "Removing these fees, or moving to a vendor that doesn't charge them, would save approximately $9,900/year with no change in goods received.",
      },
      {
        vendor: "Quickline IT Supplies", category: "Software Subscriptions & Licensing (GL 6110)", status: "na",
        savingsNote: "No contract or negotiated rate exists for this vendor. Recommend sourcing this category through a contracted vendor (or Northgate's existing agreement) rather than benchmarking an ad hoc relationship.",
      },
    ],
    forecastHighlight: {
      contractId: "C-305",
      text: "Meridian Medical Supply's $2.8M Medical/Surgical Supply GPO Agreement (C-305) expires November 15, 2026, 46 days from today. The 60-day renewal notice deadline (September 16, 2026) has already passed with no renewal or replacement RFP initiated. The same vendor also had a stockout this quarter that drove maverick spend (see Causal Spend Analysis / Budget & Intent Alignment).",
    },
  },

  brightline: {
    flagMap: { "CC-PHARM|6210": "causal", "CC-BIOMED|6040": "causal", "CC-ADMIN|6510": "causal", "CC-PROC|6420": "budget" },
    causal: [
      {
        id: "D",
        title: "Pharmaceutical Supplies \u2014 GPO Tier Movement",
        path: "CC-PHARM Pharmacy \u2192 PC-ONC Oncology & Infusion Services \u2192 GL 6210",
        cc: "CC-PHARM", gl: "6210",
        extras: [
          { label: "Tier 2 premium (vs. Tier 1 pricing)", color: COLORS.alert, byMonth: { 8: 34090.91, 9: 34090.91 } },
        ],
        narrative: "Q2 2026 purchase volume fell below the Tier 1 rolling-volume threshold on Contract C-410 with MedFlow Pharma Distribution. As a result, MedFlow automatically moved the account from Tier 1 pricing (12% off list) to Tier 2 (8% off list) starting in August. The order quantity did not change, only the discount tier, yet net cost rose by approximately $34,091 per month for every month this remains in effect. This is invisible without tracking GPO discount tiers alongside invoice totals.",
      },
      {
        id: "E",
        title: "Medical Equipment Repairs & Maintenance \u2014 CAPEX Reclassification",
        path: "CC-BIOMED Biomedical Engineering \u2192 PC-RAD Radiology & Imaging \u2192 GL 6040",
        cc: "CC-BIOMED", gl: "6040",
        extras: [
          { label: "MRI upgrade miscoded as expense", color: COLORS.alert, byMonth: { 8: 1250000 } },
        ],
        narrative: "Apex Imaging Systems invoiced $1,250,000 for an MRI Suite 2 gradient coil and console software upgrade (Project APX-2026-114), invoiced and expensed entirely to Medical Equipment Repairs & Maintenance in August. This invoice exceeds the $10,000 capitalization threshold and has a useful life beyond one year, per capitalization policy it should be recorded as a capital asset and depreciated over 7 years, not expensed in a single month. Reclassifying to a fixed asset would resolve over 99% of August's variance in this GL line, and removes a $1.25M distortion from this line's full-year spend projection.",
      },
      {
        id: "F",
        title: "Legal & Professional Services \u2014 Sole-Source Rate Increase",
        path: "CC-ADMIN Administration & Legal \u2192 PC-CORP Corporate \u2192 GL 6510",
        cc: "CC-ADMIN", gl: "6510",
        extras: [
          { label: "Whitfield & Cole rate increase impact", color: COLORS.alert, byMonth: { 7: 16000, 8: 16000, 9: 16000 } },
        ],
        narrative: "Whitfield & Cole LLP, sole-source outside counsel for an active CMS billing compliance matter, increased its rate from $650/hr to $850/hr (+30.8%) effective July 2026. There is no competitive alternative counsel with the required regulatory specialty. At the same 80 hours per month, this adds $16,000 per month, entirely attributable to the rate change rather than increased usage, for as long as the engagement continues at this rate.",
      },
    ],
    budget: [
      {
        id: "J",
        title: "Logistics & Distribution \u2014 Unauthorized Recurring Fees",
        path: "CC-PROC Procurement \u2192 PC-NEURO Neurosurgery \u2192 GL 6420",
        cc: "CC-PROC", gl: "6420",
        extras: [
          { label: "Rush-handling + fuel surcharge (not in contract)", color: COLORS.alert, byMonth: { 1: 1200, 2: 1200, 3: 1200, 4: 1200, 5: 1200, 6: 1200, 7: 1200, 8: 1200, 9: 1200 } },
        ],
        narrative: "Northstar Logistics applies a flat $700 \"rush-handling fee\" plus a roughly 0.8% \"fuel surcharge\" on every invoice against this GL line, regardless of whether any shipment was actually expedited, about $1,200/month combined. Neither charge is part of the logistics agreement. At roughly 2% of this line's monthly budget, it stays well under any variance threshold every month, about $10,800/year in fees for service that was never requested.",
      },
    ],
    vendorFlags: {
      "MedFlow Pharma Distribution": { tone: "alert", label: "GPO tier downgrade, volume opportunity" },
      "Apex Imaging Systems": { tone: "amber", label: "Capitalization review needed" },
      "Whitfield & Cole LLP": { tone: "alert", label: "Sole-source rate increase (+30.8%)" },
      "Northstar Logistics": { tone: "amber", label: "Unauthorized recurring fees" },
    },
    benchmarks: [
      {
        vendor: "MedFlow Pharma Distribution", category: "Pharmaceutical Supplies, GPO Agreement (GL 6210)", status: "above",
        contractedRate: "Tier 1: 12% off list", currentRate: "Tier 2: 8% off list (in effect since Aug 2026)",
        benchmarkRange: "11\u201313% off list among peer academic medical centers with comparable oncology infusion volume",
        savingsNote: "Tier 1 (12%) was at-market for this peer group. Restoring Tier 1, via a volume commitment or multi-year term, would save approximately $34,091/month (~$409K/yr) at current order volume.",
      },
      {
        vendor: "Whitfield & Cole LLP", category: "Legal & Professional Services (GL 6510)", status: "above",
        contractedRate: "$650.00/hr (pre-July 2026)", currentRate: "$850.00/hr (since July 2026)",
        benchmarkRange: "$700\u2013$790/hr among comparable healthcare regulatory/compliance outside counsel (3 surveyed)",
        alternatives: [{ name: "Hargrove Regulatory Counsel", rate: "$720/hr" }, { name: "Penbrook Healthcare Law Group", rate: "$765/hr" }],
        savingsNote: "Renegotiating toward the benchmark midpoint (~$750/hr) would save approximately $8,000/month (~$96K/yr) at the current 80 hrs/month.",
      },
      {
        vendor: "Northstar Logistics", category: "Logistics & Distribution (GL 6420)", status: "above",
        contractedRate: "No fees specified", currentRate: "$700/invoice rush fee + ~0.8% fuel surcharge",
        benchmarkRange: "Comparable logistics vendors in this category invoice rush fees only when expedited service is explicitly requested",
        savingsNote: "Removing these standing fees would save approximately $10,800/year with no change in service.",
      },
      {
        vendor: "Apex Imaging Systems", category: "Capital Equipment (GL 6040)", status: "na",
        savingsNote: "August's invoice was a one-time capital project, not a recurring rate. Not applicable for rate benchmarking; flagged separately for capitalization review in Causal Spend Analysis.",
      },
    ],
    forecastHighlight: {
      contractId: "C-520",
      text: "Whitfield & Cole LLP's outside counsel agreement (C-520), already the source of a 30.8% sole-source rate increase this quarter, comes up for renewal December 31, 2026, 92 days from today. Worth securing terms or evaluating alternatives before the next negotiation cycle.",
    },
  },

  pinehurst: {
    flagMap: { "CC-HR|6910": "budget", "CC-ADMIN|6710": "causal", "CC-NURSE|6310": "budget" },
    causal: [
      {
        id: "H",
        title: "Travel & Expense \u2014 Emergency Travel Surcharges",
        path: "CC-ADMIN Administration \u2192 PC-CORP Corporate \u2192 GL 6710",
        cc: "CC-ADMIN", gl: "6710",
        extras: [
          { label: "Emergency travel-nurse placements", color: COLORS.alert, byMonth: { 8: 58000 } },
        ],
        narrative: "An August flu-surge staffing shortage forced last-minute travel-nurse placements from out of state. SkyLine Travel Partners booked emergency airfare and extended-stay lodging at rush rates, adding $58,000 on top of routine business travel. This is a one-time operational response to a staffing crisis rather than a recurring cost, but it's worth tracking whether similar surges recur seasonally.",
      },
    ],
    budget: [
      {
        id: "G",
        title: "Contract & Temporary Labor \u2014 Lost Discount + Late Fees",
        path: "CC-HR HR & Staffing \u2192 PC-LTC Long-Term Care \u2192 GL 6910",
        cc: "CC-HR", gl: "6910",
        extras: [
          { label: "Lost discount + late fees", color: COLORS.alert, byMonth: { 7: 10204.08, 8: 10204.08, 9: 10204.08 } },
        ],
        narrative: "CareStaff Solutions invoices carry 2/10 Net 30 terms, a 2% discount if paid within 10 days. The budget assumes that discount is captured. Since July, an AP processing backlog has caused these invoices to be paid 75-90 days after receipt, missing the early-payment discount (about $6,122/month) and triggering 1.5%-per-month late fees (about $6,122/month) on the same recurring invoice, every month this backlog continues. This is a pure AP-process inefficiency, not a vendor pricing issue, and is fully recoverable by prioritizing this vendor in the payment queue.",
      },
      {
        id: "K",
        title: "Medical/Surgical Supplies \u2014 Unauthorized Recurring Fees",
        path: "CC-NURSE Nursing \u2192 PC-HH Home Health \u2192 GL 6310",
        cc: "CC-NURSE", gl: "6310",
        extras: [
          { label: "Per-invoice handling fee + compliance surcharge (not in contract)", color: COLORS.alert, byMonth: { 1: 1900, 2: 1900, 3: 1900, 4: 1900, 5: 1900, 6: 1900, 7: 1900, 8: 1900, 9: 1900 } },
        ],
        narrative: "Heritage Medical Supply adds a flat $150 \"handling fee\" per invoice plus a 1.5% \"fuel and compliance surcharge\" on every order against this GL line, about $1,900/month combined. Contract C-660 specifies negotiated unit pricing only, with no mention of either fee. At roughly 1.6% of this line's monthly budget, it's comfortably inside normal month-to-month variation, about $17,100/year that a line-by-line variance check would never surface.",
      },
    ],
    vendorFlags: {
      "CareStaff Solutions": { tone: "alert", label: "AP process, lost discount + late fees" },
      "SkyLine Travel Partners": { tone: "amber", label: "Emergency spend spike (Aug)" },
      "Pinehurst Facilities Co": { tone: "amber", label: "Contract expiring soon" },
      "Heritage Medical Supply": { tone: "amber", label: "Unauthorized recurring fees" },
    },
    benchmarks: [
      {
        vendor: "CareStaff Solutions", category: "Contract & Temporary Labor (GL 6910)", status: "at",
        savingsNote: "Underlying labor rates are within market range, no rate benchmark flag here. The cost driver is AP payment timing (lost discount + late fees), not vendor pricing. See Budget & Intent Alignment.",
      },
      {
        vendor: "SkyLine Travel Partners", category: "Travel & Expense (GL 6710)", status: "na",
        savingsNote: "August's spend was a one-time emergency booking during a staffing crisis and is not representative of this vendor's normal rates. Not applicable for rate benchmarking.",
      },
      {
        vendor: "Pinehurst Facilities Co", category: "Facilities Management Services (GL 6010)", status: "at",
        savingsNote: "No rate issue identified here. The relevant flag is contract renewal timing, see Financial Forecasting.",
      },
      {
        vendor: "Heritage Medical Supply", category: "Medical/Surgical Supplies (GL 6310)", status: "above",
        contractedRate: "Negotiated unit pricing only (Contract C-660)", currentRate: "+$150/invoice handling fee + 1.5% surcharge",
        benchmarkRange: "Comparable home-health medical supply agreements bundle handling into unit pricing with no separate per-invoice fee",
        savingsNote: "Removing these fees would save approximately $17,100/year with no change in unit pricing or supply quality.",
      },
    ],
    forecastHighlight: {
      contractId: "C-650",
      text: "Pinehurst Facilities Co's Facilities Management & Utilities Agreement (C-650) expires December 31, 2026, 92 days from today, and the 60-day renewal notice deadline is November 1, 2026, 32 days from today. Both renewal-relevant contracts at Pinehurst (C-650 and CareStaff's staffing agreement, C-610) happen to expire on the same date, worth coordinating into a single renewal review.",
    },
  },
};

// ---------------------------------------------------------------------------
// PERIOD HELPERS
// ---------------------------------------------------------------------------
function periodsFor(mode, month, quarter) {
  if (mode === "month") return [month];
  if (mode === "quarter") return [(quarter - 1) * 3 + 1, (quarter - 1) * 3 + 2, (quarter - 1) * 3 + 3];
  return [1, 2, 3, 4, 5, 6, 7, 8, 9];
}
function periodLabel(mode, month, quarter) {
  if (mode === "month") return `${MONTHS[month - 1]} 2026`;
  if (mode === "quarter") return `Q${quarter} 2026 (${MONTHS[(quarter - 1) * 3]}\u2013${MONTHS[(quarter - 1) * 3 + 2]})`;
  return "Year to Date (Jan\u2013Sep 2026)";
}
const selectStyle = { padding: "9px 14px", borderRadius: 8, border: `1px solid ${COLORS.border}`, background: COLORS.panel, color: COLORS.navy, fontWeight: 600, fontSize: 13.5, cursor: "pointer" };

function PeriodSelector({ mode, setMode, month, setMonth, quarter, setQuarter }) {
  return (
    <div style={{ display: "flex", gap: 10, alignItems: "center", marginBottom: 24, flexWrap: "wrap" }}>
      <div style={{ display: "flex", borderRadius: 8, border: `1px solid ${COLORS.border}`, overflow: "hidden" }}>
        {[["month", "Monthly"], ["quarter", "Quarterly"], ["ytd", "Year to Date"]].map(([v, label]) => (
          <button
            key={v}
            onClick={() => setMode(v)}
            style={{ padding: "9px 16px", border: "none", cursor: "pointer", fontSize: 13.5, fontWeight: 600, background: mode === v ? COLORS.teal : COLORS.panel, color: mode === v ? "#fff" : COLORS.navy }}
          >
            {label}
          </button>
        ))}
      </div>
      {mode === "month" && (
        <select value={month} onChange={(e) => setMonth(Number(e.target.value))} style={selectStyle}>
          {MONTHS.slice(0, 9).map((m, i) => <option key={i} value={i + 1}>{m} 2026</option>)}
        </select>
      )}
      {mode === "quarter" && (
        <select value={quarter} onChange={(e) => setQuarter(Number(e.target.value))} style={selectStyle}>
          <option value={1}>Q1 2026 (Jan\u2013Mar)</option>
          <option value={2}>Q2 2026 (Apr\u2013Jun)</option>
          <option value={3}>Q3 2026 (Jul\u2013Sep)</option>
        </select>
      )}
    </div>
  );
}

// ---------------------------------------------------------------------------
// SHARED UI BITS
// ---------------------------------------------------------------------------
function PageHeader({ eyebrow, title, subtitle }) {
  return (
    <div style={{ marginBottom: 28 }}>
      <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: "0.12em", color: COLORS.teal, textTransform: "uppercase", marginBottom: 6 }}>
        {eyebrow}
      </div>
      <h1 style={{ fontSize: 28, fontWeight: 700, color: COLORS.navy, margin: 0, letterSpacing: "-0.01em" }}>{title}</h1>
      <p style={{ fontSize: 14.5, color: COLORS.muted, marginTop: 6, maxWidth: 680, lineHeight: 1.5 }}>{subtitle}</p>
    </div>
  );
}

function Card({ children, style }) {
  return <div style={{ background: COLORS.panel, border: `1px solid ${COLORS.border}`, borderRadius: 12, padding: 20, ...style }}>{children}</div>;
}

function KPI({ label, value, sub, tone }) {
  const toneColor = tone === "alert" ? COLORS.alert : tone === "good" ? COLORS.good : COLORS.navy;
  return (
    <Card style={{ flex: 1, minWidth: 180 }}>
      <div style={{ fontSize: 12, color: COLORS.muted, fontWeight: 600, letterSpacing: "0.04em", textTransform: "uppercase" }}>{label}</div>
      <div style={{ fontSize: 26, fontWeight: 700, color: toneColor, marginTop: 8 }}>{value}</div>
      {sub && <div style={{ fontSize: 12.5, color: COLORS.muted, marginTop: 4 }}>{sub}</div>}
    </Card>
  );
}

function Badge({ children, tone = "muted" }) {
  const tones = {
    muted: { bg: "#EEF3F4", color: COLORS.muted },
    alert: { bg: COLORS.alertPale, color: COLORS.alert },
    good: { bg: COLORS.goodPale, color: COLORS.good },
    amber: { bg: COLORS.amberPale, color: "#9C7530" },
    teal: { bg: COLORS.tealPale, color: COLORS.teal },
  };
  const t = tones[tone];
  return <span style={{ display: "inline-block", padding: "3px 10px", borderRadius: 999, fontSize: 12, fontWeight: 600, background: t.bg, color: t.color }}>{children}</span>;
}

function NarrativeCard({ title, children }) {
  return (
    <Card style={{ borderLeft: `4px solid ${COLORS.teal}` }}>
      <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: "0.1em", color: COLORS.teal, textTransform: "uppercase", marginBottom: 8 }}>{title}</div>
      <p style={{ fontSize: 14.5, lineHeight: 1.65, color: COLORS.text, margin: 0 }}>{children}</p>
    </Card>
  );
}

function Table({ columns, rows }) {
  return (
    <div style={{ overflowX: "auto" }}>
      <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13.5 }}>
        <thead>
          <tr>
            {columns.map((c, i) => (
              <th key={i} style={{ textAlign: i === 0 ? "left" : "right", padding: "10px 12px", borderBottom: `2px solid ${COLORS.border}`, color: COLORS.muted, fontWeight: 600, fontSize: 12, letterSpacing: "0.04em", textTransform: "uppercase" }}>{c}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i} style={{ background: i % 2 === 0 ? "transparent" : "#FAFCFC" }}>
              {row.map((cell, j) => (
                <td key={j} style={{ padding: "10px 12px", borderBottom: `1px solid ${COLORS.border}`, textAlign: j === 0 ? "left" : "right", color: COLORS.text }}>{cell}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function EmptyState({ text }) {
  return (
    <Card style={{ textAlign: "center", padding: 40, color: COLORS.muted }}>
      <div style={{ fontSize: 14.5, lineHeight: 1.6 }}>{text}</div>
    </Card>
  );
}

// ---------------------------------------------------------------------------
// DYNAMIC STORY COMPUTATION
// ---------------------------------------------------------------------------
function computeStoryView(story, periods, combined) {
  const rows = combined.filter((r) => r.cc === story.cc && r.gl === story.gl && periods.includes(r.period));
  const budget = rows.reduce((s, r) => s + r.budget, 0);
  const actual = rows.reduce((s, r) => s + r.actual, 0);
  const variance = actual - budget;
  const extras = (story.extras || [])
    .map((e) => ({ label: e.label, color: e.color, value: periods.reduce((s, p) => s + (e.byMonth[p] || 0), 0) }))
    .filter((e) => e.value > 0.5);
  const totalExtras = extras.reduce((s, e) => s + e.value, 0);
  const withinPlan = actual - totalExtras;
  const breakdown = totalExtras > 0.5 ? [{ name: "Within-plan spend", value: Math.max(withinPlan, 0), color: COLORS.teal }, ...extras] : null;
  let hidden = 0;
  if (story.hiddenPremium) {
    hidden = periods.reduce((s, p) => s + (story.hiddenPremium.byMonth[p] || 0), 0);
  }
  return { budget, actual, variance, extras, totalExtras, breakdown, hidden };
}

function StoryCard({ story, periods, periodLbl, combined }) {
  const v = computeStoryView(story, periods, combined);
  const kpis = [
    { label: "Budget", value: fmtUSD(v.budget) },
    { label: "Actual", value: fmtUSD(v.actual) },
    { label: "Variance", value: fmtUSD(v.variance), sub: v.budget ? pct(v.variance / v.budget) + " vs. plan" : "", tone: v.variance > 0 ? "alert" : "good" },
  ];
  if (v.hidden > 0.5) {
    kpis.push({ label: story.hiddenPremium.label, value: "+" + fmtUSD(v.hidden), sub: "Invisible in the total above", tone: "alert" });
  }

  const tableRows = story.table ? story.table.rows.filter((r) => periods.includes(r.period)) : null;

  return (
    <div style={{ marginBottom: 24 }}>
      <div style={{ marginBottom: 12 }}>
        <div style={{ fontWeight: 700, color: COLORS.navy, fontSize: 17 }}>{story.title}</div>
        <div style={{ fontSize: 12.5, color: COLORS.muted, marginTop: 2 }}>{story.path}</div>
      </div>
      <div style={{ display: "flex", gap: 16, flexWrap: "wrap", marginBottom: 16 }}>
        {kpis.map((k, i) => <KPI key={i} {...k} />)}
      </div>
      {v.breakdown ? (
        <div style={{ display: "flex", gap: 20, flexWrap: "wrap", marginBottom: 16 }}>
          <Card style={{ flex: "1 1 300px" }}>
            <div style={{ fontWeight: 700, color: COLORS.navy, marginBottom: 12, fontSize: 14 }}>Decomposition \u2014 {periodLbl}</div>
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie data={v.breakdown} dataKey="value" nameKey="name" innerRadius={50} outerRadius={78} paddingAngle={2}>
                  {v.breakdown.map((d, i) => <Cell key={i} fill={d.color} />)}
                </Pie>
                <Tooltip formatter={(val) => fmtUSD(val)} />
                <Legend wrapperStyle={{ fontSize: 12 }} />
              </PieChart>
            </ResponsiveContainer>
          </Card>
          {tableRows && tableRows.length > 0 && (
            <Card style={{ flex: "1 1 380px" }}>
              <div style={{ fontWeight: 700, color: COLORS.navy, marginBottom: 12, fontSize: 14 }}>Invoice Detail</div>
              <Table columns={story.table.columns} rows={tableRows.map((r) => r.cells)} />
            </Card>
          )}
        </div>
      ) : (
        <div style={{ marginBottom: 16 }}>
          <EmptyState text={`This issue did not materially affect ${periodLbl}. See the background below for when it applies.`} />
        </div>
      )}
      <NarrativeCard title="Background">{story.narrative}</NarrativeCard>
    </div>
  );
}

// ---------------------------------------------------------------------------
// TAB 01: RECONCILIATION INTELLIGENCE
// ---------------------------------------------------------------------------
function ReconTab({ company, periods, periodLbl, mode, goTo }) {
  const combined = DATA[company].combined;
  const stories = STORIES[company];
  const rows = combined.filter((r) => periods.includes(r.period));

  const byDept = useMemo(() => {
    const m = {};
    rows.forEach((r) => {
      m[r.ccName] = m[r.ccName] || { dept: r.ccName, budget: 0, predicted: 0, actual: 0 };
      m[r.ccName].budget += r.budget;
      m[r.ccName].predicted += r.predicted;
      m[r.ccName].actual += r.actual;
    });
    return Object.values(m);
  }, [company, mode, periods.join(",")]);

  const totalBudget = byDept.reduce((s, d) => s + d.budget, 0);
  const totalPredicted = byDept.reduce((s, d) => s + d.predicted, 0);
  const totalActual = byDept.reduce((s, d) => s + d.actual, 0);
  const variance = totalActual - totalBudget;

  const byLine = useMemo(() => {
    const m = {};
    rows.forEach((r) => {
      const key = r.cc + "|" + r.gl;
      m[key] = m[key] || { key, dept: r.ccName, glName: r.glName, budget: 0, predicted: 0, actual: 0 };
      m[key].budget += r.budget;
      m[key].predicted += r.predicted;
      m[key].actual += r.actual;
    });
    return Object.values(m)
      .map((l) => {
        const variance = l.actual - l.budget;
        const predictedGap = Math.abs(l.predicted - l.actual);
        const wasPredicted = predictedGap / Math.max(l.actual, 1) < 0.05 && Math.abs(l.predicted - l.budget) / Math.max(l.budget, 1) > 0.05;
        return { ...l, variance, pct: variance / l.budget, wasPredicted };
      })
      .filter((l) => Math.abs(l.pct) > 0.1)
      .sort((a, b) => Math.abs(b.variance) - Math.abs(a.variance));
  }, [company, mode, periods.join(",")]);

  return (
    <div>
      <PageHeader
        eyebrow="Engine 01 — Reconciliation Intelligence"
        title={mode === "ytd" ? "Year to Date — Jan–Sep 2026" : `${periodLbl} Close`}
        subtitle="Monitors the GL in real time, predicts post-reconciliation outcomes using historical patterns, and flags budget variances before the close."
      />

      <div style={{ display: "flex", gap: 16, flexWrap: "wrap", marginBottom: 20 }}>
        <KPI label="Budget" value={fmtUSDk(totalBudget)} sub="All cost centers" />
        {mode !== "ytd" && <KPI label="Prediction" value={fmtUSDk(totalPredicted)} sub="Based on this company's history" />}
        <KPI label="Actual" value={fmtUSDk(totalActual)} sub={mode === "ytd" ? "Jan–Sep 2026" : "As reported this close"} />
        <KPI label="Variance vs. Budget" value={fmtUSDk(variance)} sub={pct(variance / totalBudget) + " vs. plan"} tone={variance > 0 ? "alert" : "good"} />
      </div>

      <Card style={{ marginBottom: 20 }}>
        <div style={{ fontWeight: 700, color: COLORS.navy, marginBottom: 4 }}>
          {mode === "ytd" ? "YTD Budget vs. Actual by Department" : `${periodLbl} — Budget vs. Prediction vs. Actual by Department`}
        </div>
        <div style={{ fontSize: 13, color: COLORS.muted, marginBottom: 12 }}>
          {mode === "ytd" ? "Cumulative January through September 2026" : "Prediction reflects patterns learned from this company's own historical data"}
        </div>
        <ResponsiveContainer width="100%" height={280}>
          <BarChart data={byDept} margin={{ top: 8, right: 8, left: 0, bottom: 8 }}>
            <CartesianGrid strokeDasharray="3 3" stroke={COLORS.border} />
            <XAxis dataKey="dept" tick={{ fontSize: 11, fill: COLORS.muted }} interval={0} angle={-15} textAnchor="end" height={60} />
            <YAxis tickFormatter={fmtUSDk} tick={{ fontSize: 12, fill: COLORS.muted }} />
            <Tooltip formatter={(v) => fmtUSD(v)} contentStyle={{ borderRadius: 8, border: `1px solid ${COLORS.border}` }} />
            <Legend />
            <Bar dataKey="budget" name="Budget" fill={COLORS.tealLight} radius={[4, 4, 0, 0]} />
            {mode !== "ytd" && <Bar dataKey="predicted" name="Prediction" fill={COLORS.amber} radius={[4, 4, 0, 0]} />}
            <Bar dataKey="actual" name="Actual" fill={COLORS.navy} radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </Card>

      <Card>
        <div style={{ fontWeight: 700, color: COLORS.navy, marginBottom: 12 }}>Flagged for Review</div>
        {byLine.length === 0 ? (
          <EmptyState text={`No GL lines exceed the 10% variance threshold for ${periodLbl}.`} />
        ) : (
          <Table
            columns={mode !== "ytd" ? ["Department", "GL Line", "Budget", "Prediction", "Actual", "Variance", "Status", ""] : ["Department", "GL Line", "Budget", "Actual", "Variance", ""]}
            rows={byLine.map((l) => {
              const base = [l.dept, l.glName, fmtUSD(l.budget)];
              const varianceCell = <span style={{ color: l.variance > 0 ? COLORS.alert : COLORS.good, fontWeight: 600 }}>{fmtUSD(l.variance)} ({pct(l.pct)})</span>;
              const action = (
                <button
                  onClick={() => goTo(stories.flagMap[l.key] || "causal")}
                  style={{ border: `1px solid ${COLORS.teal}`, background: "transparent", color: COLORS.teal, borderRadius: 6, padding: "5px 12px", fontSize: 12.5, fontWeight: 600, cursor: "pointer" }}
                >
                  View analysis →
                </button>
              );
              if (mode !== "ytd") {
                return [...base, fmtUSD(l.predicted), fmtUSD(l.actual), varianceCell,
                  l.wasPredicted ? <Badge tone="amber">Recurring, model predicted this</Badge> : <Badge tone="alert">New this close</Badge>,
                  action];
              }
              return [...base, fmtUSD(l.actual), varianceCell, action];
            })}
          />
        )}
        {company === "cascade" && periods.includes(8) && (
          <div style={{ marginTop: 14, fontSize: 12.5, color: COLORS.muted, fontStyle: "italic" }}>
            Note: Medical/Surgical Supplies (CC-400 / GL 6310) is not flagged here, its August total lands almost exactly on
            budget. See Budget & Intent Alignment for what's hidden inside that total.
          </div>
        )}
      </Card>
    </div>
  );
}

// ---------------------------------------------------------------------------
// TAB 02 / 03: STORY-LIST TABS
// ---------------------------------------------------------------------------
function DeptSpendTable({ company }) {
  const deptSpend = DATA[company].deptSpend;
  return (
    <Card style={{ marginBottom: 24 }}>
      <div style={{ fontWeight: 700, color: COLORS.navy, marginBottom: 4 }}>Department Spend & Total Spend Obligation (TSO)</div>
      <div style={{ fontSize: 13, color: COLORS.muted, marginBottom: 14 }}>
        Every cost center, full year. TSO = YTD Actual (invoiced) + open Purchase Orders + open Work Orders, as of Sep 30, 2026.
      </div>
      <Table
        columns={["Department (Cost Center)", "Annual Budget", "YTD Actual", "Open POs + WOs", "TSO", "YTD Variance"]}
        rows={deptSpend.map((d) => [
          d.ccName, fmtUSD(d.annualBudget), fmtUSD(d.ytdActual), fmtUSD(d.openPO + d.openWO), fmtUSD(d.tso),
          <span style={{ color: d.variance > 0 ? COLORS.alert : COLORS.good, fontWeight: 600 }}>{fmtUSD(d.variance)}</span>,
        ])}
      />
    </Card>
  );
}

function StoryListTab({ company, kind, periods, periodLbl, eyebrow, title, subtitle, emptyText }) {
  const stories = STORIES[company][kind];
  const combined = DATA[company].combined;
  return (
    <div>
      <PageHeader eyebrow={eyebrow} title={`${title} — ${periodLbl}`} subtitle={subtitle} />
      {kind === "budget" && <DeptSpendTable company={company} />}
      {stories.length === 0 ? (
        <EmptyState text={emptyText} />
      ) : (
        stories.map((s) => <StoryCard key={s.id} story={s} periods={periods} periodLbl={periodLbl} combined={combined} />)
      )}
    </div>
  );
}

// ---------------------------------------------------------------------------
// TAB 04: VENDOR & MARKET INTELLIGENCE
// ---------------------------------------------------------------------------
function BenchmarkStatusBadge({ status }) {
  if (status === "above") return <Badge tone="alert">Above market</Badge>;
  if (status === "at") return <Badge tone="good">At market</Badge>;
  return <Badge tone="muted">Not applicable</Badge>;
}

function VendorTab({ company, periods, periodLbl }) {
  const vendorsByPeriod = DATA[company].vendorsByPeriod;
  const flags = STORIES[company].vendorFlags;
  const benchmarks = STORIES[company].benchmarks || [];

  const vendors = useMemo(() => {
    const m = {};
    vendorsByPeriod.forEach((r) => {
      if (!periods.includes(r.period)) return;
      m[r.vendor] = m[r.vendor] || { name: r.vendor, total: 0, invoices: 0 };
      m[r.vendor].total += r.total;
      m[r.vendor].invoices += r.invoices;
    });
    return Object.values(m).sort((a, b) => b.total - a.total);
  }, [company, periods.join(",")]);

  const maxTotal = Math.max(...vendors.map((v) => v.total), 1);

  return (
    <div>
      <PageHeader
        eyebrow="Engine 04 — Vendor & Market Intelligence"
        title={`Vendor Spend & Rate Benchmarking — ${periodLbl}`}
        subtitle="Analyzes supplier relationships and benchmarks contracted and currently-billed rates against comparable vendors, identifying renegotiation and switching opportunities without sacrificing quality."
      />

      <Card style={{ marginBottom: 20 }}>
        <div style={{ fontWeight: 700, color: COLORS.navy, marginBottom: 4 }}>Rate Benchmarking</div>
        <div style={{ fontSize: 13, color: COLORS.muted, marginBottom: 14 }}>Contracted vs. currently-billed rate vs. comparable vendors in the same market</div>
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          {benchmarks.map((b, i) => (
            <div key={i} style={{ border: `1px solid ${COLORS.border}`, borderRadius: 10, padding: 16 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 8, marginBottom: 8 }}>
                <div>
                  <div style={{ fontWeight: 700, color: COLORS.navy }}>{b.vendor}</div>
                  <div style={{ fontSize: 12.5, color: COLORS.muted, marginTop: 2 }}>{b.category}</div>
                </div>
                <BenchmarkStatusBadge status={b.status} />
              </div>
              {b.contractedRate && (
                <div style={{ display: "flex", gap: 24, flexWrap: "wrap", fontSize: 13.5, marginBottom: 8 }}>
                  <div><span style={{ color: COLORS.muted }}>Contracted: </span><strong>{b.contractedRate}</strong></div>
                  <div><span style={{ color: COLORS.muted }}>Currently billing: </span><strong style={{ color: b.status === "above" ? COLORS.alert : COLORS.text }}>{b.currentRate}</strong></div>
                </div>
              )}
              {b.benchmarkRange && (
                <div style={{ fontSize: 13.5, color: COLORS.text, marginBottom: 8 }}>
                  <span style={{ color: COLORS.muted }}>Market benchmark: </span>{b.benchmarkRange}
                </div>
              )}
              {b.alternatives && (
                <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginBottom: 8 }}>
                  {b.alternatives.map((a, j) => (
                    <Badge key={j} tone="teal">{a.name}: {a.rate}</Badge>
                  ))}
                </div>
              )}
              <div style={{ fontSize: 13.5, color: COLORS.text, lineHeight: 1.5 }}>{b.savingsNote}</div>
            </div>
          ))}
        </div>
      </Card>

      <Card style={{ marginBottom: 20 }}>
        <div style={{ fontWeight: 700, color: COLORS.navy, marginBottom: 4 }}>Total Spend Obligation (TSO) by Vendor</div>
        <div style={{ fontSize: 13, color: COLORS.muted, marginBottom: 14 }}>
          TSO = Invoiced (YTD) + Open Purchase Orders + Open Work Orders, as of Sep 30, 2026. Open commitments are a snapshot, independent of the period selector above.
        </div>
        <Table
          columns={["Vendor", "Invoiced (YTD)", "Open POs", "Open WOs", "TSO"]}
          rows={DATA[company].vendorTSO
            .filter((v) => v.openPO + v.openWO > 0)
            .sort((a, b) => b.tso - a.tso)
            .map((v) => [
              v.name, fmtUSD(v.invoiced), v.openPO > 0 ? fmtUSD(v.openPO) : "—", v.openWO > 0 ? fmtUSD(v.openWO) : "—",
              <strong>{fmtUSD(v.tso)}</strong>,
            ])}
        />
      </Card>

      <Card>
        <div style={{ fontWeight: 700, color: COLORS.navy, marginBottom: 4 }}>Vendor Spend — {periodLbl}</div>
        <div style={{ fontSize: 13, color: COLORS.muted, marginBottom: 14 }}>All vendors with invoices in the selected period</div>
        <Table
          columns={["Vendor", "Invoices", "Spend", "Relative Spend", "Status"]}
          rows={vendors.map((v) => {
            const flag = flags[v.name];
            return [
              v.name, v.invoices, fmtUSD(v.total),
              <div style={{ background: COLORS.tealPale, borderRadius: 4, height: 8, width: "100%" }}>
                <div style={{ background: COLORS.teal, borderRadius: 4, height: 8, width: `${(v.total / maxTotal) * 100}%` }} />
              </div>,
              flag ? <Badge tone={flag.tone}>{flag.label}</Badge> : <Badge tone="good">In good standing</Badge>,
            ];
          })}
        />
      </Card>
    </div>
  );
}

// ---------------------------------------------------------------------------
// TAB 05: FINANCIAL FORECASTING
// ---------------------------------------------------------------------------
function ForecastTab({ company, mode }) {
  const contracts = DATA[company].contracts;
  const forecast = DATA[company].forecast;
  const highlight = STORIES[company].forecastHighlight;

  const horizon = mode === "month" ? "month" : mode === "quarter" ? "quarter" : "year";
  const horizonLabel = horizon === "month" ? "October 2026 (Next Month)" : horizon === "quarter" ? "Q4 2026 (Oct\u2013Dec)" : "Full Year 2026";
  const multiplier = horizon === "month" ? 1 : horizon === "quarter" ? 3 : 12;

  const rows = useMemo(() => {
    return forecast
      .map((f) => {
        const periodBudget = (f.annualBudget / 12) * multiplier;
        let projected;
        if (horizon === "year") {
          projected = f.adjProjectedFY;
        } else {
          projected = f.adjRunRateMonthly * multiplier;
        }
        const variance = projected - periodBudget;
        return { ...f, periodBudget, projected, variance, pct: variance / periodBudget };
      })
      .sort((a, b) => Math.abs(b.variance) - Math.abs(a.variance));
  }, [company, mode]);

  const contractRows = useMemo(() => {
    return contracts
      .map((c) => ({ ...c, days: daysUntil(c.end_date) }))
      .filter((c) => c.days > 0)
      .sort((a, b) => a.days - b.days);
  }, [company]);

  const highlightContract = contracts.find((c) => c.contract_id === highlight.contractId);

  return (
    <div>
      <PageHeader
        eyebrow="Engine 05 — Financial Forecasting"
        title={`Projected Spend — ${horizonLabel}`}
        subtitle="Projects spending by GL line from current spend obligations, run-rate adjusted to exclude one-time anomalies already identified by Causal Spend Analysis, compared against budget for the same horizon."
      />

      <Card style={{ marginBottom: 20 }}>
        <div style={{ fontWeight: 700, color: COLORS.navy, marginBottom: 4 }}>Projected vs. Budget by GL Line</div>
        <div style={{ fontSize: 13, color: COLORS.muted, marginBottom: 14 }}>
          Projection = year-to-date actual run-rate (Jul\u2013Sep), adjusted to exclude one-time anomalies, extrapolated across the {horizonLabel.toLowerCase()}
        </div>
        <Table
          columns={["Department", "GL Line", `${horizon === "year" ? "Annual" : horizon === "quarter" ? "Q4" : "Monthly"} Budget`, "Projected", "Variance", ""]}
          rows={rows.map((r) => [
            r.ccName, r.glName, fmtUSD(r.periodBudget), fmtUSD(r.projected),
            <span style={{ color: r.variance > 0 ? COLORS.alert : COLORS.good, fontWeight: 600 }}>{fmtUSD(r.variance)} ({pct(r.pct)})</span>,
            r.hasOneTimeAnomaly ? <Badge tone="amber">Adjusted for {MONTHS[r.anomalyMonth - 1]} one-time event</Badge> : (Math.abs(r.pct) > 0.1 ? <Badge tone="alert">Recurring drift</Badge> : <Badge tone="good">On track</Badge>),
          ])}
        />
      </Card>

      <Card style={{ marginBottom: 20, borderLeft: `4px solid ${COLORS.alert}` }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 12 }}>
          <div>
            <div style={{ fontWeight: 700, color: COLORS.navy, fontSize: 16 }}>
              {highlightContract.vendor_name} — {highlightContract.contract_name} ({highlightContract.contract_id})
            </div>
            <div style={{ fontSize: 13.5, color: COLORS.muted, marginTop: 6, maxWidth: 620, lineHeight: 1.6 }}>{highlight.text}</div>
          </div>
          <Badge tone="alert">{daysUntil(highlightContract.end_date)} days to expiration</Badge>
        </div>
      </Card>

      <Card>
        <div style={{ fontWeight: 700, color: COLORS.navy, marginBottom: 12 }}>Contract Renewal Horizon</div>
        <Table
          columns={["Contract", "Vendor", "Category", "Annual Value", "Expires", "Days Out", "Auto-Renew"]}
          rows={contractRows.map((r) => [
            r.contract_id, r.vendor_name, r.category, fmtUSD(Number(r.annual_value_estimate)), r.end_date,
            <Badge tone={r.days < 60 ? "alert" : r.days < 180 ? "amber" : "good"}>{r.days} days</Badge>,
            r.auto_renew,
          ])}
        />
      </Card>
    </div>
  );
}

// ---------------------------------------------------------------------------
// TAB 06: DEPARTMENT BUDGET INTELLIGENCE
// ---------------------------------------------------------------------------
function DeptTab({ company, periods, periodLbl }) {
  const combined = DATA[company].combined;
  const depts = useMemo(() => [...new Set(combined.map((r) => r.ccName))], [company]);
  const [dept, setDept] = useState(depts[0]);
  const activeDept = depts.includes(dept) ? dept : depts[0];

  const deptRows = combined.filter((r) => r.ccName === activeDept);

  const monthly = useMemo(() => {
    return MONTHS.map((label, i) => {
      const period = i + 1;
      const rs = deptRows.filter((r) => r.period === period);
      return { month: label, budget: rs.reduce((s, r) => s + r.budget, 0), actual: rs.reduce((s, r) => s + r.actual, 0) };
    });
  }, [company, activeDept]);

  const glLines = useMemo(() => {
    const m = {};
    deptRows.filter((r) => periods.includes(r.period)).forEach((r) => {
      const key = r.gl;
      m[key] = m[key] || { gl: r.gl, glName: r.glName, budget: 0, actual: 0 };
      m[key].budget += r.budget;
      m[key].actual += r.actual;
    });
    return Object.values(m).map((l) => ({ ...l, variance: l.actual - l.budget }));
  }, [company, activeDept, periods.join(",")]);

  return (
    <div>
      <PageHeader
        eyebrow="Engine 06 — Department Budget Intelligence"
        title="Departmental Self-Service View"
        subtitle="Gives operational leaders real-time visibility into their own department's spending, commitments, and variance."
      />

      <div style={{ marginBottom: 20 }}>
        <select
          value={activeDept}
          onChange={(e) => setDept(e.target.value)}
          style={selectStyle}
        >
          {depts.map((d) => <option key={d} value={d}>{d}</option>)}
        </select>
      </div>

      <Card style={{ marginBottom: 20 }}>
        <div style={{ fontWeight: 700, color: COLORS.navy, marginBottom: 4 }}>{activeDept} — Monthly Budget vs. Actual</div>
        <div style={{ fontSize: 13, color: COLORS.muted, marginBottom: 12 }}>January – September 2026 (full-year context)</div>
        <ResponsiveContainer width="100%" height={260}>
          <LineChart data={monthly} margin={{ top: 8, right: 8, left: 0, bottom: 8 }}>
            <CartesianGrid strokeDasharray="3 3" stroke={COLORS.border} />
            <XAxis dataKey="month" tick={{ fontSize: 12, fill: COLORS.muted }} />
            <YAxis tickFormatter={fmtUSDk} tick={{ fontSize: 12, fill: COLORS.muted }} />
            <Tooltip formatter={(v) => fmtUSD(v)} contentStyle={{ borderRadius: 8, border: `1px solid ${COLORS.border}` }} />
            <Legend />
            <Line type="monotone" dataKey="budget" name="Budget" stroke={COLORS.tealLight} strokeWidth={2} dot={false} />
            <Line type="monotone" dataKey="actual" name="Actual" stroke={COLORS.navy} strokeWidth={2.5} dot={false} />
          </LineChart>
        </ResponsiveContainer>
      </Card>

      <Card>
        <div style={{ fontWeight: 700, color: COLORS.navy, marginBottom: 12 }}>{activeDept} — {periodLbl} by GL Line</div>
        <Table
          columns={["GL Line", "Budget", "Actual", "Variance"]}
          rows={glLines.map((l) => [
            l.glName, fmtUSD(l.budget), fmtUSD(l.actual),
            <span style={{ color: l.variance > 0 ? COLORS.alert : COLORS.good, fontWeight: 600 }}>{fmtUSD(l.variance)}</span>,
          ])}
        />
      </Card>
    </div>
  );
}

// ---------------------------------------------------------------------------
// APP SHELL
// ---------------------------------------------------------------------------
export default function ClariasDashboard() {
  const [company, setCompany] = useState("cascade");
  const [active, setActive] = useState("recon");
  const [mode, setMode] = useState("month");
  const [month, setMonth] = useState(9);
  const [quarter, setQuarter] = useState(3);

  const periods = periodsFor(mode, month, quarter);
  const periodLbl = periodLabel(mode, month, quarter);

  const renderTab = () => {
    switch (active) {
      case "recon": return <ReconTab company={company} periods={periods} periodLbl={periodLbl} mode={mode} goTo={setActive} />;
      case "causal": return <StoryListTab company={company} kind="causal" periods={periods} periodLbl={periodLbl}
        eyebrow="Engine 02 — Causal Spend Analysis" title="Why Did Spending Change?"
        subtitle="AI explains why spending changed: pricing, volume, staffing, scope expansion, or policy shifts — with every conclusion traceable to source data."
        emptyText={`No causal spend anomalies attributable to ${periodLbl} for this tenant.`} />;
      case "budget": return <StoryListTab company={company} kind="budget" periods={periods} periodLbl={periodLbl}
        eyebrow="Engine 03 — Budget & Intent Alignment" title="Plan vs. Commitment vs. Actual"
        subtitle="Connects budgets, approvals, contracts, and expenditures to flag drift from approved plans — including issues hidden inside on-budget totals."
        emptyText={`No budget/intent alignment flags attributable to ${periodLbl} for this tenant.`} />;
      case "vendor": return <VendorTab company={company} periods={periods} periodLbl={periodLbl} />;
      case "forecast": return <ForecastTab company={company} mode={mode} />;
      case "dept": return <DeptTab company={company} periods={periods} periodLbl={periodLbl} />;
      default: return null;
    }
  };

  const meta = COMPANIES.find((c) => c.id === company);

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: COLORS.bg, fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif", color: COLORS.text }}>
      {/* Sidebar */}
      <div style={{ width: 280, background: COLORS.navy, color: "#fff", padding: "28px 20px", flexShrink: 0 }}>
        <div style={{ fontSize: 20, fontWeight: 800, letterSpacing: "0.02em", marginBottom: 2 }}>Clarias</div>
        <div style={{ fontSize: 12.5, color: "#9FC4C8", marginBottom: 20 }}>Multi-tenant intelligence demo</div>

        <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.12em", color: "#6E96A0", textTransform: "uppercase", marginBottom: 8 }}>Customer</div>
        <div style={{ display: "flex", flexDirection: "column", gap: 4, marginBottom: 24 }}>
          {COMPANIES.map((c) => {
            const isActive = company === c.id;
            return (
              <button
                key={c.id}
                onClick={() => setCompany(c.id)}
                style={{ textAlign: "left", padding: "10px 12px", borderRadius: 8, border: "none", cursor: "pointer", background: isActive ? COLORS.teal : "transparent", color: isActive ? "#fff" : "#C8DEE1" }}
              >
                <div style={{ fontSize: 13.5, fontWeight: 600, lineHeight: 1.3 }}>{c.name}</div>
                <div style={{ fontSize: 11.5, opacity: 0.75, marginTop: 2 }}>{c.blurb}</div>
              </button>
            );
          })}
        </div>

        <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.12em", color: "#6E96A0", textTransform: "uppercase", marginBottom: 10 }}>
          Intelligence Engines
        </div>
        <nav style={{ display: "flex", flexDirection: "column", gap: 4 }}>
          {ENGINES.map((e) => {
            const isActive = active === e.id;
            return (
              <button
                key={e.id}
                onClick={() => setActive(e.id)}
                style={{ display: "flex", alignItems: "flex-start", gap: 10, textAlign: "left", padding: "10px 12px", borderRadius: 8, border: "none", cursor: "pointer", background: isActive ? COLORS.teal : "transparent", color: isActive ? "#fff" : "#C8DEE1" }}
              >
                <span style={{ fontSize: 11, fontWeight: 700, fontFamily: "Georgia, serif", opacity: isActive ? 1 : 0.6, marginTop: 2 }}>{e.n}</span>
                <span>
                  <div style={{ fontSize: 13.5, fontWeight: 600, lineHeight: 1.3 }}>{e.name}</div>
                  <div style={{ fontSize: 11.5, opacity: 0.75, marginTop: 2, lineHeight: 1.3 }}>{e.tag}</div>
                </span>
              </button>
            );
          })}
        </nav>
        <div style={{ marginTop: 32, paddingTop: 20, borderTop: "1px solid #1C4356", fontSize: 11.5, color: "#6E96A0", lineHeight: 1.6 }}>
          {meta.name}<br />
          Data as of Sep 30, 2026<br />
          GL · AP · Contracts · Budgets, unified through the Chart of Accounts
        </div>
      </div>

      {/* Main */}
      <div style={{ flex: 1, padding: "32px 40px", overflowY: "auto" }}>
        <PeriodSelector mode={mode} setMode={setMode} month={month} setMonth={setMonth} quarter={quarter} setQuarter={setQuarter} />
        {renderTab()}
      </div>
    </div>
  );
}
