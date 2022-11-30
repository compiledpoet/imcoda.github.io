const  { Builder, By, Key,}  = require("selenium-webdriver");
const  { describe, it } = require("mocha");
const { should } = require("chai");
should();


describe("Test drone placement and movement", async () => {
    const driver = new Builder().forBrowser("chrome").build();
    
    it("adds drone into our world", async () => {
        await testPlacement(driver, 3, 6, 3, 3, 6);
    });
    
    it("drone is within world(10x10) boundary", async () => {
        await testPlacement(driver, 13, 20, 3, 10, 10);
    })
});

async function testPlacement(driver, placeX, placeY, option, expectedX = placeX, expectedY = placeY){
    await driver.get("http://localhost:3000");
        
    await driver.findElement(By.id("input-place-x")).clear();
    await driver.findElement(By.id("input-place-x")).sendKeys(`${ placeX }`);
    await driver.findElement(By.id("input-place-y")).clear()
    await driver.findElement(By.id("input-place-y")).sendKeys(`${ placeY }`)
    await driver.findElement(By.xpath(`//*[@id="input-place-direction"]/option[${ option }]`)).click();

    await driver.findElement(By.id("btn-set-place")).click();

    const elemDrone = await driver.findElement(By.id("drone"));
    const x = await elemDrone.getCssValue("grid-column-start");
    const y = await elemDrone.getCssValue("grid-row-start");
    const direction = await elemDrone.getCssValue("rotate");

    const invertedY = 11 - expectedY;

    const optionDeg = (option - 1) * 90;
    
    x.should.equal(`${ expectedX }`);
    y.should.equal(`${ invertedY }`);
    direction.should.equal(`${ optionDeg }deg`);
}
async function Main(){

  
}

Main();