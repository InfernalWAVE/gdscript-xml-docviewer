<?xml version="1.0" encoding="UTF-8" ?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform" version="2.0">
    <xsl:output method="html" doctype-public="XSLT-compat" omit-xml-declaration="yes" encoding="UTF-8" indent="yes" />

    <xsl:template match="/">
        <html>
            <head>
                <title>Documentation</title>
                <style type="text/css">
                    body {
                        font-family: Arial, sans-serif;
                        margin: 20px;
                        background-color: #f4f4f4;
                        color: #333;
                    }
                    h1, h2, h3 {
                        color: #005A9C;
                    }
                    ul {
                        padding-left: 20px;
                    }
                    li {
                        margin-bottom: 10px;
                        border-bottom: 1px solid #ddd;
                        padding-bottom: 10px;
                    }
                    strong {
                        color: #005A9C;
                    }
                </style>
            </head>
            <body>
                <h2>Filename: <xsl:value-of select="translate(class/@name, '&quot;', '')"/></h2>
                <!-- Added section for 'inherits', without quotation marks -->
                <xsl:if test="class/@inherits">
                    <h3>Inherits: <xsl:value-of select="translate(class/@inherits, '&quot;', '')"/></h3>
                </xsl:if>
                <h3>Brief Description</h3>
                <p><xsl:value-of select="class/brief_description"/></p>
                <h3>Description</h3>
                <p><xsl:value-of select="class/description"/></p>
                <h3>Methods</h3>
                <ul>
                    <xsl:for-each select="class/methods/method">
                        <li>
                            <strong>Name: </strong> <xsl:value-of select="@name"/><br/>
                            <strong>Type: </strong> <xsl:value-of select="return/@type"/><br/>
                            <strong>Description: </strong> <xsl:value-of select="description"/><br/>
                        </li>
                    </xsl:for-each>
                </ul>
                <h3>Members</h3>
                <ul>
                    <xsl:for-each select="class/members/member">
                        <li>
                            <strong>Name: </strong> <xsl:value-of select="@name"/><br/>
                            <strong>Type: </strong> <xsl:value-of select="@type"/><br/>
                            <strong>Description: </strong> <xsl:value-of select="."/><br/>
                        </li>
                    </xsl:for-each>
                </ul>
            </body>
        </html>
    </xsl:template>
</xsl:stylesheet>
