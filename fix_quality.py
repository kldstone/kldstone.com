import sys
sys.stdout.reconfigure(encoding="utf-8")
lines = open("src/pages/Quality.tsx","r",encoding="utf-8").readlines()
keep = []
i = 0
while i < len(lines):
    l = lines[i]
    # Skip inspectionImgs variable
    if l.strip().startswith("const inspectionImgs"):
        i += 1
        continue
    # Skip inspection gallery block (wrapper div through closing div)
    if "grid grid-cols-2 sm:grid-cols-3 gap-3 mb-16" in l:
        # Find the closing div for this wrapper (second </div> after this)
        div_count = 0
        j = i + 1
        while j < len(lines):
            if lines[j].strip().startswith("</div>"):
                div_count += 1
                if div_count >= 2:
                    j += 1
                    break
            j += 1
        i = j
        continue
    # Skip empty packaging step wrapper div
    if "overflow-hidden" in l and "lg:[direction:ltr]" in l and l.strip().startswith("<div"):
        next_line = lines[i+1] if i+1 < len(lines) else ""
        if not next_line.strip() or next_line.strip() == "</div>":
            i += 2
            continue
    # Fix grid container classes
    if "grid grid-cols-1 lg:grid-cols-2 gap-10 items-center " in l:
        l = l.replace("grid grid-cols-1 lg:grid-cols-2 gap-10 items-center ", "")
    if '} ${i % 2 === 1 ? "lg:[direction:rtl]" : ""}`}' in l:
        l = l.replace('} ${i % 2 === 1 ? "lg:[direction:rtl]" : ""}`}', "}`}")
    keep.append(l)
    i += 1
open("src/pages/Quality.tsx","w",encoding="utf-8").writelines(keep)
print("Done", len(keep), "lines")
