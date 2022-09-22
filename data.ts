const mockdataString = ` {"icb": [{
	"ident": "persona.al1",
	"naam": "Persona AL 1",
	"competenties": [],
	"icbRol": "AL",
	"vanaf": "2019-03-10T23:00:00Z",
	"totMet": "2020-04-27T22:00:00Z",
	"voertuigId": "1-42797-299EF46E1",
	"kenteken": "58-BFF-1"
}, {
	"ident": "persona.mw2",
	"naam": "Persona MW2",
	"competenties": ["slapen", "muziek maken", "deuren openen", "ruzie zoeken", "graven", "vrachtwagen rijbewijs"],
	"icbRol": "PL",
	"vanaf": "2019-02-24T08:00:00Z",
	"totMet": "2020-04-27T12:00:00Z",
	"voertuigId": "1-42797-299EF46E1",
	"kenteken": "58-BFF-1"
}]}`;

const icbers = JSON.parse(mockdataString);
export {icbers};