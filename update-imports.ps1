# PowerShell script to update all import paths to use @/ alias

$files = Get-ChildItem -Path "src" -Recurse -Include *.tsx,*.ts

foreach ($file in $files) {
    $content = Get-Content $file.FullName -Raw
    $originalContent = $content
    
    # Replace Hooks imports
    $content = $content -replace "from ["""]\.\.\/\.\.\/\.\.\/\.\.\/Hooks\/", "from "@/Hooks/"
    $content = $content -replace "from ["""]\.\.\/\.\.\/\.\.\/Hooks\/", "from "@/Hooks/"
    $content = $content -replace "from ["""]\.\.\/\.\.\/Hooks\/", "from "@/Hooks/"
    
    # Replace assets imports
    $content = $content -replace "from ["""]\.\.\/\.\.\/\.\.\/\.\.\/assets\/", "from "@/assets/"
    $content = $content -replace "from ["""]\.\.\/\.\.\/\.\.\/assets\/", "from "@/assets/"
    $content = $content -replace "from ["""]\.\.\/\.\.\/assets\/", "from "@/assets/"
    
    # Replace components imports (but not self-references within components)
    $content = $content -replace "from ["""]\.\.\/\.\.\/\.\.\/\.\.\/components\/", "from "@/components/"
    $content = $content -replace "from ["""]\.\.\/\.\.\/\.\.\/components\/", "from "@/components/"
    $content = $content -replace "from ["""]\.\.\/\.\.\/components\/", "from "@/components/"
    
    # Replace Pages imports
    $content = $content -replace "from ["""]\.\.\/\.\.\/\.\.\/\.\.\/Pages\/", "from "@/Pages/"
    $content = $content -replace "from ["""]\.\.\/\.\.\/\.\.\/Pages\/", "from "@/Pages/"
    $content = $content -replace "from ["""]\.\.\/\.\.\/Pages\/", "from "@/Pages/"
    
    # Replace app imports
    $content = $content -replace "from ["""]\.\.\/\.\.\/\.\.\/\.\.\/app\/", "from "@/app/"
    $content = $content -replace "from ["""]\.\.\/\.\.\/\.\.\/app\/", "from "@/app/"
    $content = $content -replace "from ["""]\.\.\/\.\.\/app\/", "from "@/app/"
    
    # Replace Provider imports
    $content = $content -replace "from ["""]\.\.\/\.\.\/\.\.\/\.\.\/Provider\/", "from "@/Provider/"
    $content = $content -replace "from ["""]\.\.\/\.\.\/\.\.\/Provider\/", "from "@/Provider/"
    $content = $content -replace "from ["""]\.\.\/\.\.\/Provider\/", "from "@/Provider/"
    $content = $content -replace "from ["""]\.\/\.\.\/\.\.\/Provider\/", "from "@/Provider/"
    
    # Only write if content changed
    if ($content -ne $originalContent) {
        Set-Content -Path $file.FullName -Value $content -NoNewline
        Write-Host "Updated: $($file.FullName)"
    }
}

Write-Host "Import path update complete!"
