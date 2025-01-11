// Global variable to store diesel density
let dieselDensityGlobal = null;

// Diesel Density Calculator
document.getElementById("calculateDensityButton").addEventListener("click", function () {
    const dryWeight = parseFloat(document.getElementById("dryWeightDensity").value);
    const wetWeight = parseFloat(document.getElementById("wetWeightDensity").value);
    const temperature = parseFloat(document.getElementById("temperature").value);

    if (isNaN(dryWeight) || isNaN(wetWeight) || isNaN(temperature)) {
        document.getElementById("densityResult").innerHTML = "Please fill in all fields correctly.";
        return;
    }

    const densityCopper = 8.97;
    const thermalExpansionCoefficient = 0.0008;

    const buoyantForce = dryWeight - wetWeight;
    const copperVolume = dryWeight / densityCopper;
    let dieselDensity = buoyantForce / copperVolume;

    const standardTemperature = 25;
    dieselDensity *= 1 - thermalExpansionCoefficient * (temperature - standardTemperature);

    dieselDensityGlobal = dieselDensity;

    document.getElementById("densityResult").innerHTML =
        `Diesel Density: ${dieselDensity.toFixed(3)} g/cm³ (${(dieselDensity * 1000).toFixed(1)} kg/m³)`;
});

// Gold Karat and Additional Properties Calculator
document.getElementById("calculateGoldButton").addEventListener("click", function () {
    const dryWeight = parseFloat(document.getElementById("dryWeightGold").value);
    const wetWeight = parseFloat(document.getElementById("wetWeightGold").value);

    if (isNaN(dryWeight) || isNaN(wetWeight)) {
        document.getElementById("goldPurity").innerText = "Please fill in all fields correctly.";
        return;
    }

    if (dieselDensityGlobal === null) {
        document.getElementById("goldPurity").innerText = "Please calculate diesel density first.";
        return;
    }

    const pureGoldDensity = 19.32;

    const buoyantForce = dryWeight - wetWeight;
    const volumeGold = buoyantForce / dieselDensityGlobal;
    const goldDensity = dryWeight / volumeGold;

    const purityPercentage = (goldDensity / pureGoldDensity) * 100;
    const karat = (purityPercentage / 100) * 24;
    const pureWeight = (purityPercentage / 100) * dryWeight;
    const impureWeight = dryWeight - pureWeight;
    const fineness = (purityPercentage / 1000) * 1000;

    // Corrected Milli Calculation
    const milli = 1000 - (karat /24 * 1000);

    // Rati Calculation
    const rati = milli / 10;

    document.getElementById("goldPurity").innerText = `Purity: ${purityPercentage.toFixed(2)}%`;
    document.getElementById("pureWeight").innerText = `Pure Weight: ${pureWeight.toFixed(3)} gm`;
    document.getElementById("impureWeight").innerText = `Impure Weight: ${impureWeight.toFixed(3)} gm`;
    document.getElementById("goldKarat").innerText = `Karat: ${karat.toFixed(2)}K`;
    document.getElementById("fineness").innerText = `Fineness: ${fineness.toFixed(2)}/1000`;
    document.getElementById("milli").innerText = `Milli: ${milli.toFixed(2)}`;
    document.getElementById("rati").innerText = `Rati: ${rati.toFixed(2)}`;
});
