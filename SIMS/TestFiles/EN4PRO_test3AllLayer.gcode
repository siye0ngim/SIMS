;FLAVOR:Marlin
;TIME:0
;Filament used: 0m
;Layer height: 0.2
;MINX:2.14748e+06
;MINY:2.14748e+06
;MINZ:2.14748e+06
;MAXX:-2.14748e+06
;MAXY:-2.14748e+06
;MAXZ:-2.14748e+06
;Generated with Cura_SteamEngine 4.8.0

M82 ;absolute extrusion mode
;ELEGOO NEPTUNE 4 PRO
M220 S100 ;Set the feed speed to 100%
M221 S100 ;Set the flow rate to 100%
M104 S140
M190 S60
G90
G28 ;home
G1 Z10 F300
G1 X67.5 Y0 F6000
G1 Z0 F300
M109 S200
G92 E0 ;Reset Extruder
G1 X67.5 Y0 Z0.4 F300 ;Move to start position
G1 X167.5 E30 F400 ;Draw the first line
G1 Z0.6 F120.0 ;Move to side a little
G1 X162.5 F3000
G92 E0 ;Reset Extruder
G92 E0
G92 E0
G1 F2700 E-0.8
;LAYER_COUNT:0
M140 S0
M204 S5000
M107
G91 ;Relative positionning
G1 E-2 F2700 ;Retract a bit
G1 E-8 X5 Y5 Z3 F3000 ;Retract
G90 ;Absolute positionning
G1 X10 Y220 F6000;Finish print
M106 S0 ;Turn-off fan
M104 S0 ;Turn-off hotend
M140 S0 ;Turn-off bed
M84 X Y E ;Disable all steppers but Z
M82 ;absolute extrusion mode
;End of Gcode
;SETTING_3 {"extruder_quality": ["[general]\\nversion = 4\\nname = Fine Fast #2\
;SETTING_3 \ndefinition = elegoo_neptune_4_pro\\n\\n[metadata]\\nsetting_version
;SETTING_3  = 16\\ntype = quality_changes\\nposition = 0\\nquality_type = fine_f
;SETTING_3 ast\\n\\n[values]\\nmaterial_print_temperature = 200\\n\\n"], "global
;SETTING_3 _quality": "[general]\\nversion = 4\\nname = Fine Fast #2\\ndefinitio
;SETTING_3 n = elegoo_neptune_4_pro\\n\\n[metadata]\\nsetting_version = 16\\ntyp
;SETTING_3 e = quality_changes\\nquality_type = fine_fast\\n\\n[values]\\nadhesi
;SETTING_3 on_type = raft\\nsupport_enable = True\\n\\n"}
