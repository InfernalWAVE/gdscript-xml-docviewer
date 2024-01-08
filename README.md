# gdscript-xml-docviewer
a way to view gdscript documentation XML files outputted by the CLI --doctool --gdscript-docs in Godot. Renders HTML in browser using an XSLT file.

![image](https://github.com/InfernalWAVE/gdscript-xml-docviewer/assets/48569884/e7b99bab-199b-4ee7-a2e8-89aad470a991)

# how to use
- open html file in browser
- upload xml file output by --doctool
- upload xslt file in this repo
- press transform

# relevant godot docs
- command line tutorial:
https://docs.godotengine.org/en/stable/tutorials/editor/command_line_tutorial.html

- gdscript documentation comments:
https://docs.godotengine.org/en/stable/tutorials/scripting/gdscript/gdscript_documentation_comments.html

# NOTE
gdscript documentation comments support documenting several more features than what the xslt file handles at this time. right now it captures documentation for the script, member variables, and member functions.
