const path = require("path")
const helpers = require("yeoman-test")

describe('rts-react:component', function () {
    it('generate a project', function () {
        return helpers.run(path.join(__dirname, '../component'))
            .withOptions({ i18n: true })   
            .withPrompts({ name: "Dummy" }) 
            .withLocalConfig({ lang: 'en' })
            .then(function () {
                console.log("hello")
            });
    })
});
