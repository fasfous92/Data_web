<?xml version = "1.0"?>

<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
    <xsl:output method="html"/>
   <xsl:param name="param" select="AF"/>
<xsl:template match="/">
<html>
 <BODY>
         <xsl:variable name="code" select="translate($param,'abcdefghijklmnopqrstuvwxyz','ABCDEFGHIJKLMNOPQRSTUVWXYZ')"/>

     <pays_recherche>
           <xsl:apply-templates select="//country_codes[cca2=$code]/.."/>
    </pays_recherche>

 </BODY>
</html>
</xsl:template>

<xsl:template match="country">
    <li>
        Official Name: <xsl:text/>
            <xsl:value-of select="country_name/offic_name"/>
        <br/>

    </li>
    <li>
        Capital City: <xsl:text/>
            <xsl:value-of select="capital"/>
    </li>

</xsl:template>
</xsl:stylesheet>
