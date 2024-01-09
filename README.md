# gdscript-xml-docviewer
a way to view gdscript documentation XML files outputted by the CLI --doctool --gdscript-docs in Godot. Renders as HTML in browser using an XSLT file. Supports multiple XML files at once. Supports HTML export

![image](https://github.com/InfernalWAVE/gdscript-xml-docviewer/assets/48569884/88c0b395-f2c0-4337-ae25-a01706c29d9c)

# how to use
- open html file in browser
- upload xml files output by --doctool
- upload xslt file in this repo
- press Process Files
- to export output, press Export HTML

# relevant godot docs
- command line tutorial:
https://docs.godotengine.org/en/stable/tutorials/editor/command_line_tutorial.html

- gdscript documentation comments:
https://docs.godotengine.org/en/stable/tutorials/scripting/gdscript/gdscript_documentation_comments.html

# NOTE
gdscript documentation comments support documenting several more features than what the xslt file handles at this time. right now it captures documentation for the script, member variables, and member functions. this is why I make the xslt uploadable rather than built-in though. it is easily editable/upgradable!
