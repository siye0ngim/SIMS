G90 ; Absolute positioning
M83 ; Set extruder to absolute mode
M200 S60 ; Set filament diameter to 1.75mm
M104 S200 ; Set nozzle temperature to 200°C
M140 S60 ; Set bed temperature to 60°C
G28 ; Home all axes
G29 ; Auto bed leveling
G1 Z15.0 F300 ; Move the platform down 15mm

; Start of print layers
G1 F300 ; Set feedrate to 300mm/min
G0 X75.9375 Y46.875 Z0 E0 ; Move to starting position and reset extrusion
G0 X75.46875 Y46.875 Z0 F300 E4 ; Extrude filament while moving to next position

; Your series of G0 and G1 commands here with appropriate extrusion (E) values

; End of print
M107 ; Turn off fan
G28 ; This command homes all axes (X, Y, Z)
M104 S0 ; Set the extruder temperature to 0
M140 S0 ; Set the heated bed temperature to 0
M84 ; Disable stepper motors

; End of G-code