$Word = New-Object -ComObject Word.Application
$Word.Visible = $false
$Doc = $Word.Documents.Open("d:\repositorio_geral\midia_kit_2ciecc\Comercial_Education.pdf")
$Text = $Doc.Content.Text
$Text | Out-File "d:\repositorio_geral\midia_kit_2ciecc\Comercial_Education_extracted.txt"
$Doc.Close()
$Word.Quit()
[System.Runtime.Interopservices.Marshal]::ReleaseComObject($Word) | Out-Null
Write-Host "Texto extraído com sucesso!"
