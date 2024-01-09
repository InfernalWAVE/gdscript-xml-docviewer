# gdscript-xml-docviewer
a way to view gdscript documentation XML files outputted by the CLI --doctool --gdscript-docs in Godot. Renders as HTML in browser using an XSLT file. Supports multiple XML files at once. Supports HTML and PDF export.

![image](https://github.com/InfernalWAVE/gdscript-xml-docviewer/assets/48569884/98aed327-22b6-4855-ab52-37e328a01926)

# how to use
- open html file in browser
- upload xml files output by --doctool
- upload xslt file in this repo
- press Process Files
- to export output, press Export HTML/PDF

# relevant godot docs
- command line tutorial:
https://docs.godotengine.org/en/stable/tutorials/editor/command_line_tutorial.html

- gdscript documentation comments:
https://docs.godotengine.org/en/stable/tutorials/scripting/gdscript/gdscript_documentation_comments.html

# relevant godot source
- godot/doc/classes
  - this tool works with the godot engine class references linked below!

https://github.com/godotengine/godot/tree/master/doc/classes

# NOTE
gdscript documentation comments support documenting several more features than what the xslt file handles at this time. right now it captures descriptions for the script, inheritance, member variables, and member functions. this is why I made the xslt uploadable rather than built-in. it is easily editable/upgradable!
