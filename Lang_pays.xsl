<?xml version = "1.0"?>

<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
    <xsl:output method="html"/>
  <xsl:param name="param" />
<xsl:template match="/">
<html>
 <BODY>

     <pays_recherche>
           <xsl:apply-templates select="//country/languages[*/node()=$param]/.."/>

     </pays_recherche>



 </BODY>
</html>
</xsl:template>

<xsl:template match="//country">

	      <xsl:value-of select="current()/country_codes/cca2"/>
    <br/>

	</xsl:template>
</xsl:stylesheet>




