# gdscript-xml-docviewer
a way to view gdscript documentation XML files outputted by the CLI --doctool --gdscript-docs in Godot. Renders as HTML in browser using an XSLT file. Supports multiple XML files at once

![image](https://github.com/InfernalWAVE/gdscript-xml-docviewer/assets/48569884/1b25600f-df89-45cd-92da-0f8bad1f94f9)

# how to use
- open html file in browser
- upload xml files output by --doctool
- upload xslt file in this repo
- press transform

# relevant godot docs
- command line tutorial:
https://docs.godotengine.org/en/stable/tutorials/editor/command_line_tutorial.html

- gdscript documentation comments:
https://docs.godotengine.org/en/stable/tutorials/scripting/gdscript/gdscript_documentation_comments.html

# NOTE
gdscript documentation comments support documenting several more features than what the xslt file handles at this time. right now it captures documentation for the script, member variables, and member functions.
