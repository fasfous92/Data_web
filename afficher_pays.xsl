<?xml version = "1.0"?>

<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
    <xsl:output method="html"/>
  <xsl:param name="param"/>
<xsl:template match="/">
<html>
 <BODY>
         <!-- <xsl:variable name="code" select="translate($param,'abcdefghijklmnopqrstuvwxyz','ABCDEFGHIJKLMNOPQRSTUVWXYZ')"/>
     -->
     <pays_affiche>

         <ul>
           <xsl:apply-templates select="//country_codes[cca2=$param]/.."/>
         </ul>
     </pays_affiche>



 </BODY>
</html>
</xsl:template>

<xsl:template match="//country">
   <table bgcolor="#FFFDD0" border="3" width="70%" align="center" >
	 <tr>
	            <th>Name</th>
	            <th>Capital</th>
                <th>Spoken languages</th>
	            <th>Flag</th>
	 </tr>
	          <tr>
	          	<td><xsl:value-of select="country_name/common_name"/></td>
	            <td><xsl:value-of select="capital"/></td>
               <td>
					<xsl:for-each select="languages/*">
						<xsl:if test="position() &gt;1">
			  				,
			  	 	</xsl:if>
					<xsl:value-of select="current()"/>
				  </xsl:for-each>
				  </td>
	            <td>
	            <img src="http://www.geonames.org/flags/x/{translate(country_codes/cca2,'ABCDEFGHIJKLMNOPQRSTUVWXYZ', 'abcdefghijklmnopqrstuvwxyz')}.gif" alt="" height="40" width="60"> </img>
	            </td>
	         </tr>
    </table>


	</xsl:template>
</xsl:stylesheet>
