import { PrismaClient } from "@prisma/client";
import userService from "../src/userApp/userService"

const prisma = new PrismaClient();

async function createDataBase() {
	const genres = await prisma.genre.createMany({
		data: [
			{
				name: "Фентезі",
				description:
					"Фентезі - це літературний жанр, в якому магія та інші надприродні  явища  є  головними  елементами  сюжету,  теми  чи  місця  дії. Багато  історій  цього жанру  відбуваються  у  вигаданих  світах,   де  магія  є   звичною  справою.",
			},
			{
				name: "Бойовик",
				description:
					"Бойовик поєднує в собі драматичний жанр фільму разом з нестримними діями: бійки, автомобільні переслідування, вибухи, стрілянина тощо. Жанр, в основному, показує самостійні намагання героя відновити справедливість, що нерідко переростає у маленьку війну.",
			},
			{
				name: "Детектив",
				description:
					"У детективі розкривається певна таємниця, пов'язана зі злочином",
			},
			{
				name: "Пригоди",
				description:
					"У жанрі пригоди показується кмітливість та винахідливість героя, уміння перехитрити злодія",
			},
			{
				name: "Комедія",
				description:
					"У комедійних фільмах засобами гумору та сатири викриваються негативні суспільні та побутові явища, розкривається смішне в навколишній дійсності людини чи живої істоти.",
			},
			{
				name: "Драма",
				description:
					"У драматичних фільмах існує гострий конфлікт, який розвивається в постійній напрузі.",
			},
			{
				name: "Трилер",
				description:
					"У фільмах з жанром трилер специфічні засоби повинні викликати у глядачів або читачів почуття співпереживання, пов'язане з емоціями тривожного очікування, невизначеності, хвилювання чи страху.",
			},
			{
				name: "Хорор",
				description:
					"Фільми з жанром хорор розкриває сюжети та теми, які призначені чи мають потенціал, щоб налякати або досягти переляку своїх читачів, викликаючи почуття жаху і терору.",
			},
			{
				name: "Історичний",
				description:
					"Історичні фільми спеціалізовані на зображенні значущих для окремого народу чи людства подій минулого.",
			},
			{
				name: "Документальний",
				description:
					"У документальних фільмах сюжетна лінія побудована винятково на реальних подіях",
			},
		],
	});

	const film1 = await prisma.film.create({
		data: {
			name: "Red One",
			src: "https://m.media-amazon.com/images/M/MV5BZmFkMjE4NjQtZTVmZS00MDZjLWE2ZmEtZTkzODljNjhlNWUxXkEyXkFqcGc@._V1_FMjpg_UY576_.jpg",
			rating: 9,
			year: 2024,
			baseLanguage: "English",
			homeCountry: "USA",
			ageRestriction: "PG-13",
			description:
				"After Santa Claus is kidnapped, the North Pole's Head of Security must team up with a notorious hacker in a globe-trotting, action-packed mission to save Christmas.",
			genres: {
				create: [
					{
						genre: {
							connect: {
								id: 1,
							},
						},
					},
					{
						genre: {
							connect: {
								id: 2,
							},
						},
					},
					{
						genre: {
							connect: {
								id: 3,
							},
						},
					},
					{
						genre: {
							connect: {
								id: 4,
							},
						},
					},
					{
						genre: {
							connect: {
								id: 5,
							},
						},
					},
				],
			},
			photo1: "https://m.media-amazon.com/images/M/MV5BMGU2Mzg4YTctOGM5Zi00ODYwLTk4YjUtZGRiZmQyN2U0NDQ0XkEyXkFqcGc@._V1_.jpg",
			photo2: "https://m.media-amazon.com/images/M/MV5BYjU4MjA4YjctZDdjYy00ODRiLWFlNWItOGEwOWJhYjc5NzIxXkEyXkFqcGc@._V1_.jpg",
			photo3: "https://m.media-amazon.com/images/M/MV5BNzM4OTlhZmUtMjUzMy00ZTkwLThlMzUtOGVhNjUyOTM4MjdhXkEyXkFqcGc@._V1_.jpg",
			photo4: "https://m.media-amazon.com/images/M/MV5BYmM5ZGQxYjQtNGYwMi00NGFmLTlhY2UtYmY4NjkzOWU3OGZlXkEyXkFqcGc@._V1_.jpg",
		},
	});

	const film2 = await prisma.film.create({
		data: {
			name: "Conclave",
			src: "https://m.media-amazon.com/images/M/MV5BYmRhODMyMWQtYTM5OS00NTAwLWE1MmQtNDUxZWVlMGEwYjE1XkEyXkFqcGc@._V1_FMjpg_UY720_.jpg",
			rating: 8,
			year: 2024,
			baseLanguage: "English",
			homeCountry: "USA",
			ageRestriction: "PG-13",
			description:
				"When Cardinal Lawrence is tasked with leading one of the world's most secretive and ancient events, selecting a new Pope, he finds himself at the center of a conspiracy that could shake the very foundation of the Catholic Church.",
			genres: {
				create: [
					{
						genre: {
							connect: {
								id: 3,
							},
						},
					},
				],
			},
			photo1: "https://m.media-amazon.com/images/M/MV5BYWQ3ZDdiMTYtZGUwMy00MDQwLWI2ZGMtNDJkMTU1NGY3YmE2XkEyXkFqcGc@._V1_.jpg",
			photo2: "https://m.media-amazon.com/images/M/MV5BYzJiY2MxYjMtZGFkNC00NWM3LTlhN2QtOGIwODRiN2Y0ZjNmXkEyXkFqcGc@._V1_.jpg",
			photo3: "https://m.media-amazon.com/images/M/MV5BMGJmNGZkZGQtZmEzOS00Mzg0LTk4YTAtYjRjZjhhMzg0NGFlXkEyXkFqcGc@._V1_.jpg",
			photo4: "https://m.media-amazon.com/images/M/MV5BMTI0ZmI4YmQtZGNiNS00ZTlkLThhNTAtYTIzZDIxZmUwYzlhXkEyXkFqcGc@._V1_.jpg"
		},
	});

	const film3 = await prisma.film.create({
		data: {
			name: "The Best Christmas Pageant Ever",
			src: "https://m.media-amazon.com/images/M/MV5BMmZhOTNkYmEtMjRlNC00YzViLWFlNGMtNWFmN2FiODM5NmYzXkEyXkFqcGc@._V1_FMjpg_UY720_.jpg",
			rating: 10,
			year: 2024,
			baseLanguage: "English",
			homeCountry: "USA",
			ageRestriction: "G",
			description:
				"Nobody is ready for the mayhem and surprises that ensue when six of the worst youngsters disrupt the town's yearly Christmas performance.",
			genres: {
				create: [
					{
						genre: {
							connect: {
								id: 5,
							},
						},
					},
					{
						genre: {
							connect: {
								id: 6,
							},
						},
					},
				],
			},
			photo1: "https://m.media-amazon.com/images/M/MV5BNzM4Nzg4OWUtMjQwNi00NjUzLWJkNmQtNjRkOTZhYjExMTQwXkEyXkFqcGc@._V1_.jpg",
			photo2: "https://m.media-amazon.com/images/M/MV5BMzYxMjNiODctMzk5NS00N2M4LWFlMTYtZmJlNDBkZTJiMzhhXkEyXkFqcGc@._V1_.jpg",
			photo3: "https://m.media-amazon.com/images/M/MV5BZWVjYWIwNGUtMzc3My00ZmFkLTg1NDctZmY5ZjRiMjk4NDQwXkEyXkFqcGc@._V1_.jpg",
			photo4: "https://m.media-amazon.com/images/M/MV5BZWM0MjQ4YTItMTMzZi00NWVmLTg4ZGItMWU2MTYyYmVhYTgxXkEyXkFqcGc@._V1_.jpg"
		},
	});


	const film4 = await prisma.film.create({
		data: {
			name: "Black Adam",
			src: "https://m.media-amazon.com/images/M/MV5BYjg5NTAyNzQtMDc3Ni00NjU1LWI1NjQtYTljZjY5NTM4NThkXkEyXkFqcGc@._V1_.jpg",
			rating: 6,
			year: 2022,
			baseLanguage: "English",
			homeCountry: "USA",
			ageRestriction: "PG-13",
			description:
				"Nearly 5,000 years after he was bestowed with the almighty powers of the Egyptian gods--and imprisoned just as quickly--Black Adam is freed from his earthly tomb, ready to unleash his unique form of justice on the modern world.",
			genres: {
				create: [
					{
						genre: {
							connect: {
								id: 1,
							},
						},
					},
					{
						genre: {
							connect: {
								id: 2,
							},
						},
					},
					{
						genre: {
							connect: {
								id: 4,
							},
						},
					},
				],
			},
			photo1: "https://m.media-amazon.com/images/M/MV5BZjA3YmY4ZTUtMWI5ZS00ZGQxLWJjZWQtNWQxNDNmOWVhYjM4XkEyXkFqcGc@._V1_.jpg",
			photo2: "https://m.media-amazon.com/images/M/MV5BODdhOGIwZTEtZjdhYi00NTYzLTk1OWItMjA4YmNjMmM0Mzg4XkEyXkFqcGc@._V1_.jpg",
			photo3: "https://m.media-amazon.com/images/M/MV5BMDhjZTlhY2ItNDk1Ny00NjVkLTgzNTQtZDI1ZDVhZWQ2MTZkXkEyXkFqcGc@._V1_.jpg",
			photo4: "https://m.media-amazon.com/images/M/MV5BZTM1ZTUxYWYtNjEzMC00YjgwLTg5MWQtMmQ5OTA0ZTk1NTNlXkEyXkFqcGc@._V1_.jpg"
		},
	});


	const film5 = await prisma.film.create({
		data: {
			name: "Jumanji: Welcome to the Jungle",
			src: "https://m.media-amazon.com/images/M/MV5BZjI5MzdmODctYjA4NS00ZmMxLWJlOWUtOGVhMjA0OGMxMWYzXkEyXkFqcGc@._V1_.jpg",
			rating: 7,
			year: 2017,
			baseLanguage: "English",
			homeCountry: "USA",
			ageRestriction: "PG-13",
			description:
				"Four teenagers are sucked into a magical video game, and the only way they can escape is to work together to finish the game.",
			genres: {
				create: [
					{
						genre: {
							connect: {
								id: 1,
							},
						},
					},
					{
						genre: {
							connect: {
								id: 2,
							},
						},
					},
					{
						genre: {
							connect: {
								id: 4,
							},
						},
					},
					{
						genre: {
							connect: {
								id: 5,
							},
						},
					},
				],
			},
			photo1: "https://m.media-amazon.com/images/M/MV5BMjA3NDcwNDI3OF5BMl5BanBnXkFtZTgwNDY5MDkzNDM@._V1_.jpg",
			photo2: "https://m.media-amazon.com/images/M/MV5BMTY2ODU1MTMzMF5BMl5BanBnXkFtZTgwODY5MDkzNDM@._V1_.jpg",
			photo3: "https://m.media-amazon.com/images/M/MV5BMzQ5OTUwOTQ4M15BMl5BanBnXkFtZTgwNzEyODQ0MzI@._V1_.jpg",
			photo4: "https://m.media-amazon.com/images/M/MV5BMjA2NjMyOTMzMl5BMl5BanBnXkFtZTgwMTc5MDkzNDM@._V1_.jpg"
		},
	});

	const film6 = await prisma.film.create({
		data: {
			name: "Journey 2: The Mysterious Island",
			src: "https://m.media-amazon.com/images/M/MV5BMjA5MTE1MjQyNV5BMl5BanBnXkFtZTcwODI4NDMwNw@@._V1_.jpg",
			rating: 6,
			year: 2012,
			baseLanguage: "English",
			homeCountry: "USA",
			ageRestriction: "PG-13",
			description:
				"Sean Anderson partners with his mom's husband on a mission to find his grandfather, who is thought to be missing on a mythical island.",
			genres: {
				create: [
					{
						genre: {
							connect: {
								id: 1,
							},
						},
					},
					{
						genre: {
							connect: {
								id: 2,
							},
						},
					},
					{
						genre: {
							connect: {
								id: 4,
							},
						},
					},
					{
						genre: {
							connect: {
								id: 5,
							},
						},
					},
				],
			},
			photo1: "https://m.media-amazon.com/images/M/MV5BMTUwNDM4MjQxMF5BMl5BanBnXkFtZTcwMzU3OTUyNw@@._V1_.jpg",
			photo2: "https://m.media-amazon.com/images/M/MV5BMzAyOTI3Njg3OV5BMl5BanBnXkFtZTcwNzI3OTUyNw@@._V1_.jpg",
			photo3: "https://m.media-amazon.com/images/M/MV5BNzk0Njk5NDEzMl5BMl5BanBnXkFtZTcwMjY3OTUyNw@@._V1_.jpg",
			photo4: "https://m.media-amazon.com/images/M/MV5BMzIyMTg2MjM0Nl5BMl5BanBnXkFtZTcwMjM3OTUyNw@@._V1_.jpg"
		},
	});

	const film7 = await prisma.film.create({
		data: {
			name: "Baywatch",
			src: "https://m.media-amazon.com/images/M/MV5BNTA4MjQ0ODQzNF5BMl5BanBnXkFtZTgwNzA5NjYzMjI@._V1_.jpg",
			rating: 6,
			year: 2017,
			baseLanguage: "English",
			homeCountry: "USA",
			ageRestriction: "R",
			description:
				"Devoted lifeguard Mitch Buchannon butts heads with a brash new recruit, as they uncover a criminal plot that threatens the future of the bay.",
			genres: {
				create: [
					{
						genre: {
							connect: {
								id: 2,
							},
						},
					},
					{
						genre: {
							connect: {
								id: 5,
							},
						},
					},
				],
			},
			photo1: "https://m.media-amazon.com/images/M/MV5BMTk1MjY4OTY0MV5BMl5BanBnXkFtZTgwODE5MDAzMjI@._V1_.jpg",
			photo2: "https://m.media-amazon.com/images/M/MV5BMTc5NzYxNDAwM15BMl5BanBnXkFtZTgwMTI5MDAzMjI@._V1_.jpg",
			photo3: "https://m.media-amazon.com/images/M/MV5BMTg3Njc0MzY0MF5BMl5BanBnXkFtZTgwNjI5MDAzMjI@._V1_.jpg",
			photo4: "https://m.media-amazon.com/images/M/MV5BMTU2NjM2MTAxNl5BMl5BanBnXkFtZTgwMDE5MDAzMjI@._V1_.jpg"
		},
	});

	const film8 = await prisma.film.create({
		data: {
			name: "Skyscraper",
			src: "https://m.media-amazon.com/images/M/MV5BNWYyYTExNWMtZGYyYy00YTEzLTg5MzEtY2YyMDI3MDNlMjcwXkEyXkFqcGc@._V1_.jpg",
			rating: 6,
			year: 2018,
			baseLanguage: "English",
			homeCountry: "USA",
			ageRestriction: "PG-13",
			description:
				"A security expert must infiltrate a burning skyscraper, 225 stories above ground, when his family is trapped inside by criminals.",
			genres: {
				create: [
					{
						genre: {
							connect: {
								id: 2,
							},
						},
					},
					{
						genre: {
							connect: {
								id: 4,
							},
						},
					},
					{
						genre: {
							connect: {
								id: 7,
							},
						},
					},
				],
			},
			photo1: "https://m.media-amazon.com/images/M/MV5BMjQwNDg5MTYyMV5BMl5BanBnXkFtZTgwMjc3MjM4NTM@._V1_.jpg",
			photo2: "https://m.media-amazon.com/images/M/MV5BMjc1MDIxNzI2OV5BMl5BanBnXkFtZTgwMzc3MjM4NTM@._V1_.jpg",
			photo3: "https://m.media-amazon.com/images/M/MV5BMzgyMDA2MzgzMV5BMl5BanBnXkFtZTgwMjU3MjM4NTM@._V1_.jpg",
			photo4: "https://m.media-amazon.com/images/M/MV5BMTY5MDg0NTI1Ml5BMl5BanBnXkFtZTgwNzc3MjM4NTM@._V1_.jpg"
		},
	});

	const film9 = await prisma.film.create({
		data: {
			name: "Pain & Gain",
			src: "https://m.media-amazon.com/images/M/MV5BMTU0NDE5NTU0OV5BMl5BanBnXkFtZTcwMzI1OTMzOQ@@._V1_.jpg",
			rating: 6,
			year: 2013,
			baseLanguage: "English",
			homeCountry: "USA",
			ageRestriction: "R",
			description:
				"A trio of bodybuilders in Florida get caught up in an extortion ring and a kidnapping scheme that goes terribly wrong.",
			genres: {
				create: [
					{
						genre: {
							connect: {
								id: 2,
							},
						},
					},
					{
						genre: {
							connect: {
								id: 5,
							},
						},
					},
					{
						genre: {
							connect: {
								id: 6,
							},
						},
					},
				],
			},
			photo1: "https://m.media-amazon.com/images/M/MV5BOTI4OTAwOTk5Ml5BMl5BanBnXkFtZTcwNTk1MTkzOQ@@._V1_.jpg",
			photo2: "https://m.media-amazon.com/images/M/MV5BMTYzNzE1OTM2Ml5BMl5BanBnXkFtZTcwNjk1MTkzOQ@@._V1_.jpg",
			photo3: "https://m.media-amazon.com/images/M/MV5BMTA3NDMyMTMyODleQTJeQWpwZ15BbWU3MDI4NTA2Mzk@._V1_.jpg",
			photo4: "https://m.media-amazon.com/images/M/MV5BMzIyNjMyMzQ0N15BMl5BanBnXkFtZTcwMDMzNDAzOQ@@._V1_.jpg"
		},
	});

	const film10 = await prisma.film.create({
		data: {
			name: "Central Intelligence",
			src: "https://m.media-amazon.com/images/M/MV5BMjA2NzEzNjIwNl5BMl5BanBnXkFtZTgwNzgwMTEzNzE@._V1_.jpg",
			rating: 6,
			year: 2016,
			baseLanguage: "English",
			homeCountry: "USA",
			ageRestriction: "R",
			description:
				"After he reconnects with an awkward pal from high school through Facebook, a mild-mannered accountant is lured into the world of international espionage.",
			genres: {
				create: [
					{
						genre: {
							connect: {
								id: 2,
							},
						},
					},
					{
						genre: {
							connect: {
								id: 5,
							},
						},
					},
				],
			},
			photo1: "https://m.media-amazon.com/images/M/MV5BMjE5Njg3MzU3OV5BMl5BanBnXkFtZTgwODcwODUwOTE@._V1_.jpg",
			photo2: "https://m.media-amazon.com/images/M/MV5BMTk0MTM5NjA5M15BMl5BanBnXkFtZTgwMDgwODUwOTE@._V1_.jpg",
			photo3: "https://m.media-amazon.com/images/M/MV5BMjAwMjg0MDg2MV5BMl5BanBnXkFtZTgwNDgwODUwOTE@._V1_.jpg",
			photo4: "https://m.media-amazon.com/images/M/MV5BMTgyNjA2MDIyNF5BMl5BanBnXkFtZTgwMzcwODUwOTE@._V1_.jpg"
		},
	});

	const film11 = await prisma.film.create({
		data: {
			name: "Rampage",
			src: "https://m.media-amazon.com/images/M/MV5BNDA1NjA3ODU3OV5BMl5BanBnXkFtZTgwOTg3MTIwNTM@._V1_.jpg",
			rating: 6,
			year: 2018,
			baseLanguage: "English",
			homeCountry: "USA",
			ageRestriction: "PG-13",
			description:
				"When three different animals become infected with a dangerous pathogen, a primatologist and a geneticist team up to stop them from destroying Chicago.",
			genres: {
				create: [
					{
						genre: {
							connect: {
								id: 2,
							},
						},
					},
					{
						genre: {
							connect: {
								id: 4,
							},
						},
					},
				],
			},
			photo1: "https://m.media-amazon.com/images/M/MV5BMTAyMzA2MTcwNDFeQTJeQWpwZ15BbWU4MDQxOTkyMDUz._V1_.jpg",
			photo2: "https://m.media-amazon.com/images/M/MV5BMTE0MDg3Njc5MzleQTJeQWpwZ15BbWU4MDA5ODkyMDUz._V1_.jpg",
			photo3: "https://m.media-amazon.com/images/M/MV5BMDY5NGMyMWQtZjJlMy00NTkxLTlhNTctOGZjZGUyYjRhMmRlXkEyXkFqcGc@._V1_.jpg",
			photo4: "https://m.media-amazon.com/images/M/MV5BMmE0MGQzNzUtMmE0Yi00YjRhLTkwODctOTNhYmEyYTE0ZDAzXkEyXkFqcGc@._V1_.jpg"
		},
	});

	const film12 = await prisma.film.create({
		data: {
			name: "Jumanji: The Next Level",
			src: "https://m.media-amazon.com/images/M/MV5BYTJiZTk5ZDgtOTBjOC00YjZjLTg1NGMtOTE3MzIwOTVlY2EwXkEyXkFqcGc@._V1_.jpg",
			rating: 7,
			year: 2019,
			baseLanguage: "English",
			homeCountry: "USA",
			ageRestriction: "PG-13",
			description:
				"In Jumanji: The Next Level, the gang is back but the game has changed. As they return to rescue one of their own, the players will have to brave parts unknown from arid deserts to snowy mountains, to escape the world's most dangerous game.",
			genres: {
				create: [
					{
						genre: {
							connect: {
								id: 1,
							},
						},
					},
					{
						genre: {
							connect: {
								id: 2,
							},
						},
					},
					{
						genre: {
							connect: {
								id: 4,
							},
						},
					},
					{
						genre: {
							connect: {
								id: 5,
							},
						},
					},
				],
			},
			photo1: "https://m.media-amazon.com/images/M/MV5BMWIxYTViYTQtODU3ZC00NTQyLWJiMjQtZjYxYzMxMTg5Y2UzXkEyXkFqcGc@._V1_.jpg",
			photo2: "https://m.media-amazon.com/images/M/MV5BNWRlZDBlNDAtNzhlMS00NjBkLWI0ZGMtMGU1MTM4OTk4OWMyXkEyXkFqcGc@._V1_.jpg",
			photo3: "https://m.media-amazon.com/images/M/MV5BOGY4OGE1OTctYWVmMS00NzJiLWE2NzktMmQwYTJhNGJkN2E0XkEyXkFqcGc@._V1_.jpg",
			photo4: "https://m.media-amazon.com/images/M/MV5BYTY4YWE5MDQtNTQ1NC00OWY5LWI0NzAtYzBmZGJhOGVhYjMyXkEyXkFqcGc@._V1_.jpg"
		},
	});

	const actor1 = await prisma.actor.create({
		data: {
			name: "Dwayne Johnson",
			src: "https://m.media-amazon.com/images/M/MV5BOWUzNzIzMzQtNzMxYi00OWRiLTlhZjEtZTRjYWVkYzI4ZjMwXkEyXkFqcGc@._V1_QL75_UX140_CR0,12,140,140_.jpg",
			bornInDate: "May 2, 1972",
			bornInCity: "Hayward, California",
			bornInCountry:"USA",
			biography: 'Dwayne Douglas Johnson, also known as The Rock, was born on May 2, 1972 in Hayward, California. He is the son of Ata Johnson (born Feagaimaleata Fitisemanu) and professional wrestler Rocky Johnson (born Wayde Douglas Bowles). His father, from Amherst, Nova Scotia, Canada, is black (of Black Nova Scotian descent), and his mother is of Samoan background (her own father was Peter Fanene Maivia, also a professional wrestler). While growing up, Dwayne traveled around a lot with his parents and watched his father perform in the ring. During his high school years, Dwayne began playing football and he soon received a full scholarship from the University of Miami, where he had tremendous success as a football player. In 1995, Dwayne suffered a back injury which cost him a place in the NFL. He then signed a three-year deal with the Canadian League but left after a year to pursue a career in wrestling.\nHe made his wrestling debut in the USWA under the name Flex Kavanah where he won the tag team championship with Brett Sawyer. In 1996, Dwayne joined the WWE and became Rocky Maivia where he joined a group known as "The Nation of Domination" and turned heel. Rocky eventually took over leadership of the "Nation" and began taking the persona of The Rock. After the "Nation" split, The Rock joined another elite group of wrestlers known as the "Corporation" and began a memorable feud with Steve Austin. Soon the Rock was kicked out of the "Corporation". He turned face and became known as "The Peoples Champion". In 2000, the Rock took time off from WWE to film his appearance in Мумия возвращается (2001). He returned in 2001 during the WCW/ECW invasion where he joined a team of WWE wrestlers at Царь Скорпионов (2002), a prequel to Мумия возвращается (2001).\nDwayne has a daughter, Simone Alexandra Johnson, born in 2001, with his ex-wife Dany Garcia, and daughters, Jasmine, born in 2015, and Tiana Gia, born in 2018, with his wife, singer and songwriter Lauren Hashian.',
			height: "1.93 m",
			mother: "Ata Johnson",
			father: "Rocky Johnson",
			films: {
				create: [
					{
						film: {
							connect: {
								id: 1,
							},
						},
					},
					{
						film: {
							connect: {
								id: 4,
							},
						},
					},
					{
						film: {
							connect: {
								id: 5,
							},
						},
					},
					{
						film: {
							connect: {
								id: 6,
							},
						},
					},
					{
						film: {
							connect: {
								id: 7,
							},
						},
					},
					{
						film: {
							connect: {
								id: 8,
							},
						},
					},
					{
						film: {
							connect: {
								id: 9,
							},
						},
					},
					{
						film: {
							connect: {
								id: 10,
							},
						},
					},
					{
						film: {
							connect: {
								id: 11,
							},
						},
					},
					{
						film: {
							connect: {
								id: 12,
							},
						},
					}
				]
			}
		}
	})

	const actor2 = await prisma.actor.create({
		data: {
			name: "Chris Evans",
			src: "https://m.media-amazon.com/images/M/MV5BNzQ0YWM1ODEtZDFkYy00MGJhLTkwZDUtMzVkZjljODU3ZTRmXkEyXkFqcGc@._V1_QL75_UX140_CR0,12,140,140_.jpg",
			bornInDate: "June 13, 1981",
			bornInCity: "Boston, Massachusetts",
			bornInCountry: "USA",
			biography: "Christopher Robert Evans is an American actor, film producer, and director. Evans began his acting career in typical fashion: performing in school productions and community theatre.\nHe was born in Boston, Massachusetts, the son of Lisa (Capuano), who worked at the Concord Youth Theatre, and G. Robert Evans III, a dentist. His uncle is former U.S. Representative Mike Capuano. Chris's father is of half German and half Welsh/English/Scottish ancestry, while Chris's mother is of half Italian and half Irish descent. He has an older sister, Carly Evans, and two younger siblings, a brother named Scott Evans, who is also an actor, and a sister named Shana Evans. The family moved to suburban Sudbury when he was 11 years-old. Bitten by the acting bug in the first grade because his older sister, Carly, started performing, Evans followed suit and began appearing in school plays. While at Lincoln-Sudbury Regional High School, his drama teacher cited his performance as 'Leontes' in 'The Winter`s Tale' as exemplary of his skill. After more plays and regional theatre, he moved to New York and attended the Lee Strasberg Theatre Institute.\nOn the advice of friends, he landed an internship at a casting office and befriended a couple of the agents he regularly communicated with - one of whom later took him on as a client. The screen - not the stage - then became his focus; Evans soon began auditioning for feature films and television series. Evans made one of his first appearances on Беглец: Погоня продолжается (2000) (CBS, 2000-2001), a remake of the 1960s series and feature film starring Harrison Ford. In the episode 'Guilt', Evans played the son of a small-town sheriff who tries to exact revenge after Dr. Richard Kimble - incognito as a liquor store owner - refuses to sell him and his friends alcohol. After small roles in Убийства в Черри-Фолс (1999) and Новоприбывшие (2000) - two unknown low-budget features - Evans appeared in Бостонская школа (2000) (Fox, 2000-2004) as a murder suspect. He then appeared in his first major feature, Недетское кино (2001), a spoof on teen comedies wherein he played a jock who makes a bet that he can turn an unpopular and unkempt girl (Chyler Leigh) into prom queen.\nAfter filming a couple of television pilots he was confident would be successful - Молодожёны (2003) and Иствик (2002) - he appeared in another listless teen comedy, Bыcший балл (2004), playing an average, ho-hum student who takes part in a plot to steal the SAT test. Hijinks naturally ensue. Then, Evans broke through to the Big Time, grabbing the lead in the kidnapping thriller, Сотовый (2004), a suspenseful B movie with a cheesy gimmick - a random wrong number on his cell phone forces him into a high-stakes race to save an unknown woman's life. Despite an unassuming performance from Evans and Kim Basinger as the damsel in distress, Сотовый (2004) failed to break any box office records or please a wide majority of critics. Evans then prepared himself for super stardom when he signed on to play Johnny Storm in Фантастическая четвёрка (2005), 20th Century Fox's long-awaited adaptation of the Marvel comic. Although the film was wildly uneven and disappointing, Evans nearly stole the show with his energetic, unfettered performance. In that year itself, Chris was noticed by critics and made it into magazine and Internet countdowns, scoring himself a third position of the hot body countdown from Gay.com and #18 on E! Television's 2006 101 Sexiest Celebrity Bodies.\nThe year 2007 also proved to be one successful year for Chris, as he had two movies released around the world that same year, starting with the second installment of the Marvel franchise Fantastic Four. Chris received positive reviews for his performance. Дневники няни (2007), where Evans played Harvard Hottie, showed his sensitive. The year 2008 saw Chris Evans' part of the movie Короли улиц (2008), playing the character Detective Paul Diskant. The movie is about police officers trying to cover up their wrongdoings and audiences got to see a serious side of Chris. In the same year, Chris also worked on the movie Пропажа алмаза Слеза (2008).",
			height: "1.84 m",
			mother: "Lisa Evans",
			father: "G. Robert Evans",
			films: {
				create: [
					{
						film: {
							connect: {
								id: 1,
							},
						},
					},
				]
			}
		}
	})

	const actor3 = await prisma.actor.create({
		data: {
			name: "J.K. Simmons",
			src: "https://m.media-amazon.com/images/M/MV5BMzg2NTI5NzQ1MV5BMl5BanBnXkFtZTgwNjI1NDEwMDI@._V1_QL75_UX140_CR0,0,140,140_.jpg",
			bornInDate: "January 9, 1955",
			bornInCity: "Grosse Pointe, Michigan",
			bornInCountry: "USA",
			biography: "J.K. Simmons is an American actor.\nHe was born Jonathan Kimble Simmons in Grosse Pointe, Michigan, to Patricia (Kimble), an administrator, and Donald William Simmons, a music teacher. He attended the Ohio State University, Columbus, OH; University of Montana, Missoula, MT (BA in Music).\nHe had originally planned to be a singer and studied at the University of Montana to become a composer.\nHe starred as Captain Hook and Mr. Darling opposite gymnastics champ Cathy Rigby in the Broadway and touring revivals of Peter Pan.\nHe played Benny South-street in the 1992 Broadway revival of Guys and Dolls and can be heard on the cast recording.\nHe did a commercial voice-over work, including the voice of the yellow M&M in the candy's TV ads.\nHe appeared as police psychiatrist Emil Skoda on Закон и порядок (1990), Закон и порядок: Специальный корпус (1999) and Закон и порядок. Преступное намерение (2001).\nAs of 2011, has made five films with director Sam Raimi: Ради любви к игре (1999); Дар (2000); Человек-паук (2002); Человек-паук 2 (2004); and Человек-паук 3: Враг в отражении (2007).\nHe won many awards from 2005 to 2007 in Screen Actors Guild Awards. In 2014 won Oscar for Best Performance by an Actor in a Supporting Role. 2015 won a Golden Globe for his Best Performance as an Actor in a Supporting Role in a Motion Picture, BAFTA Film Awards Best Supporting Actor, Independent Spirit Awards Best Supporting Male.",
			height: "1.80 m",
			mother: "Patricia Kimble",
			father: "Donald William Simmons",
			films: {
				create: [
					{
						film: {
							connect: {
								id: 1,
							},
						},
					},
				]
			}
		}
	})

	const director1 = await prisma.director.create({
		data: {
			name: "Jake Kasdan",
			src: "https://m.media-amazon.com/images/M/MV5BNDk1NjAwOTg1MV5BMl5BanBnXkFtZTcwODIwMjA3NA@@._V1_.jpg",
			bornInDate: "October 28, 1974",
			bornInCity: "Detroit, Michigan",
			bornInCountry: "USA",
			biography: "Jake Kasdan was born on October 28, 1974 in Detroit, Michigan, USA. He is a producer and director, known for Взлеты и падения: История Дьюи Кокса (2007), Джуманджи: Новый уровень (2019) and Нулевой эффект (1998).",
			height: "1.68 m",
			mother: "Meg Kasdan",
			father: "Lawrence Kasdan",
			films: {
				create: [
					{
						film: {
							connect: {
								id: 1,
							},
						},
					},
					{
						film: {
							connect: {
								id: 5,
							},
						},
					},
					{
						film: {
							connect: {
								id: 12,
							},
						},
					},
				]
			}
		}
	})


	const director2 = await prisma.director.create({
		data: {
			name: "Jaume Collet-Serra",
			src: "https://m.media-amazon.com/images/M/MV5BMTc3OTk0MTk2M15BMl5BanBnXkFtZTcwMjE1MjA1NA@@._V1_.jpg",
			bornInDate: "March 23, 1974",
			bornInCity: "Barcelona, Catalonia",
			bornInCountry: "Spain",
			biography: "Jaume Collet-Serra was born on March 23, 1974 in Barcelona, Barcelona, Catalonia, Spain. At the age of 18, he moved to Los Angeles and attended Columbia College Hollywood, working as an editor on the side. Upon graduation, he began shooting music videos and caught the eye of several production companies. From there he began directed various commercials for companies such as Playstation, Budweiser, Mastercard and Verizon. Since then, he has directed and produced movies such as The Shallows (2016), Orphan (2009) and Unknown (2011).",
			height: "-",
			mother: "-",
			father: "-",
			films: {
				create: [
					{
						film: {
							connect: {
								id: 4,
							},
						},
					},
				]
			}
		}
	})



	const director3 = await prisma.director.create({
		data: {
			name: "Dallas Jenkins",
			src: "https://m.media-amazon.com/images/M/MV5BMGE0MTc5M2UtNzFhYS00ZWI0LTllZTQtYmY0ZWNkOWUzOTBmXkEyXkFqcGc@._V1_.jpg",
			bornInDate: "July 25, 1975",
			bornInCity: "Bonney Lake, Washington",
			bornInCountry: "USA",
			biography: "J.K. Simmons is an American actor.\nHe was born Jonathan Kimble Simmons in Grosse Pointe, Michigan, to Patricia (Kimble), an administrator, and Donald William Simmons, a music teacher. He attended the Ohio State University, Columbus, OH; University of Montana, Missoula, MT (BA in Music).\nHe had originally planned to be a singer and studied at the University of Montana to become a composer.\nHe starred as Captain Hook and Mr. Darling opposite gymnastics champ Cathy Rigby in the Broadway and touring revivals of Peter Pan.\nHe played Benny South-street in the 1992 Broadway revival of Guys and Dolls and can be heard on the cast recording.\nHe did a commercial voice-over work, including the voice of the yellow M&M in the candy's TV ads.\nHe appeared as police psychiatrist Emil Skoda on Закон и порядок (1990), Закон и порядок: Специальный корпус (1999) and Закон и порядок. Преступное намерение (2001).\nAs of 2011, has made five films with director Sam Raimi: Ради любви к игре (1999); Дар (2000); Человек-паук (2002); Человек-паук 2 (2004); and Человек-паук 3: Враг в отражении (2007).\nHe won many awards from 2005 to 2007 in Screen Actors Guild Awards. In 2014 won Oscar for Best Performance by an Actor in a Supporting Role. 2015 won a Golden Globe for his Best Performance as an Actor in a Supporting Role in a Motion Picture, BAFTA Film Awards Best Supporting Actor, Independent Spirit Awards Best Supporting Male.",
			height: "1.80 m",
			mother: "Diana Louis Whiteford",
			father: "Jerry B. Jenkins",
			films: {
				create: [
					{
						film: {
							connect: {
								id: 3,
							},
						},
					},
				]
			}
		}
	})

	const director4 = await prisma.director.create({
		data: {
			name: "Brad Peyton",
			src: "https://m.media-amazon.com/images/M/MV5BMjA2OTMzNjM3OF5BMl5BanBnXkFtZTgwNTE3ODUzNTE@._V1_.jpg",
			bornInDate: "May 27, 1978",
			bornInCity: "Gander, Newfoundland and Labrador",
			bornInCountry: "Canada",
			biography: "Brad Peyton was born on May 27, 1978 in Gander, Newfoundland and Labrador, Canada. He is a producer and writer, known for Рассвет (2019), Атлас (2024) and Рэмпейдж (2018).",
			height: "1.83 m",
			mother: "Ann Peyton",
			father: "Dunley Peyton",
			films: {
				create: [
					{
						film: {
							connect: {
								id: 6,
							},
						},
					},
					{
						film: {
							connect: {
								id: 11,
							},
						},
					},
				]
			}
		}
	})
	

	const director5 = await prisma.director.create({
		data: {
			name: "Seth Gordon",
			src: "https://m.media-amazon.com/images/M/MV5BMjAzOTkyNTkyN15BMl5BanBnXkFtZTYwNzIzMDA3._V1_.jpg",
			bornInDate: "July 15, 1974",
			bornInCity: "Evanston, Illinois",
			bornInCountry: "USA",
			biography: "Seth Gordon was born on July 15, 1974 in Evanston, Illinois, USA. He is a producer and director, known for Снова в деле (2025), Затерянный город (2022) and Boлк_одиночка (2005).",
			height: "1.92 m",
			mother: "-",
			father: "-",
			films: {
				create: [
					{
						film: {
							connect: {
								id: 7,
							},
						},
					},
				]
			}
		}
	})

	const director6 = await prisma.director.create({
		data: {
			name: "Rawson Marshall Thurber",
			src: "https://m.media-amazon.com/images/M/MV5BMTk0MzVlNGEtMDFmMS00ZWM5LTgzMmEtMGZhNWZhM2RjN2I4XkEyXkFqcGc@._V1_.jpg",
			bornInDate: "February 9, 1975",
			bornInCity: "San Francisco, California",
			bornInCountry: "USA",
			biography: "Rawson Marshall Thurber was born on February 9, 1975 in San Francisco, California, USA. He is a director and producer, known for Красное уведомление (2021), Отличница лёгкого поведения (2010) and Небоскрёб (2018). He is married to Sarah. They have three children.",
			height: "1.85 m",
			mother: "Patricia McGuckian",
			father: "Fred Marshall Thurber",
			films: {
				create: [
					{
						film: {
							connect: {
								id: 8,
							},
						},
					},
					{
						film: {
							connect: {
								id: 10,
							},
						},
					},
				]
			}
		}
	})

	const director7 = await prisma.director.create({
		data: {
			name: "Michael Bay",
			src: "https://m.media-amazon.com/images/M/MV5BMTc2NzcyMDU5NV5BMl5BanBnXkFtZTcwODc1OTM0NA@@._V1_.jpg",
			bornInDate: "February 17, 1965",
			bornInCity: "Los Angeles, California",
			bornInCountry: "USA",
			biography: 'A graduate of Wesleyan University, Michael Bay spent his 20s working on advertisements and music videos. His first projects after film school were in the music video business. He created music videos for Tina Turner, Meat Loaf, Lionel Richie, Wilson Phillips, Donny Osmond and Divinyls. His work won him recognition and a number of MTV award nominations. He also filmed advertisements for Nike, Reebok, Coca-Cola, Budweiser and Miller Lite. He won the Grand Prix Clio for Commercial of the Year for his "Got Milk/Aaron Burr" commercial. At Cannes, he has won the Gold Lion for The Best Beer campaign for Miller Lite, as well as the Silver for "Got Milk". In 1995, Bay was honored by the Directors Guild of America as Commercial Director of the Year. That same year, he also directed his first feature film, Плохие парни (1995), starring Will Smith and Martin Lawrence, which grossed more than $160 million, worldwide. His follow-up film, Скала (1996), starring Sean Connery and Nicolas Cage, was also hugely successful, making Bay the director du jour.',
			height: "1.85 m",
			mother: "Harriet Bay",
			father: "Sheldon James Bay",
			films: {
				create: [
					{
						film: {
							connect: {
								id: 9,
							},
						},
					},
				]
			}
		}
	})
	


	// const actor4 = await prisma.actor.create({
	// 	data: {
	// 		name: "Ralph Fiennes",
	// 		src: "https://m.media-amazon.com/images/M/MV5BMzc5MjE1NDgyN15BMl5BanBnXkFtZTcwNzg2ODgwNA@@._V1_QL75_UX140_CR0,0,140,140_.jpg",
			
	// 		films: {
	// 			create: [
	// 				{
	// 					film: {
	// 						connect: {
	// 							id: 2,
	// 						},
	// 					},
	// 				},
	// 			]
	// 		}
	// 	}
	// })

	// const actor5 = await prisma.actor.create({
	// 	data: {
	// 		name: "Stanley Tucci",
	// 		src: "https://m.media-amazon.com/images/M/MV5BMTU1MzE4MjAzMV5BMl5BanBnXkFtZTcwMjA2MTMyMw@@._V1_QL75_UX140_CR0,3,140,140_.jpg",
	// 		films: {
	// 			create: [
	// 				{
	// 					film: {
	// 						connect: {
	// 							id: 2,
	// 						},
	// 					},
	// 				},
	// 			]
	// 		}
	// 	}
	// })

	// const actor6 = await prisma.actor.create({
	// 	data: {
	// 		name: "John Lithgow",
	// 		src: "https://m.media-amazon.com/images/M/MV5BMTQzMzUyNDkzNF5BMl5BanBnXkFtZTcwNTMwNTU5MQ@@._V1_QL75_UX140_CR0,0,140,140_.jpg",
	// 		films: {
	// 			create: [
	// 				{
	// 					film: {
	// 						connect: {
	// 							id: 2,
	// 						},
	// 					},
	// 				},
	// 			]
	// 		}
	// 	}
	// })

	// const actor7 = await prisma.actor.create({
	// 	data: {
	// 		name: "Kynlee Heiman",
	// 		src: "https://m.media-amazon.com/images/M/MV5BMDNhOTQ2ZTUtYWQ0Ny00ZjY3LTljNjUtNjVmYmZjNTEzZTllXkEyXkFqcGc@._V1_QL75_UX140_CR0,12,140,140_.jpg",
	// 		films: {
	// 			create: [
	// 				{
	// 					film: {
	// 						connect: {
	// 							id: 3,
	// 						},
	// 					},
	// 				},
	// 			]
	// 		}
	// 	}
	// })

	// const actor8 = await prisma.actor.create({
	// 	data: {
	// 		name: "Sebastian Billingsley-Rodriguez",
	// 		src: "https://m.media-amazon.com/images/M/MV5BNjcyYzFkYjAtYjYwNy00ZDRmLTlmNWQtMmNjMmZiYTMyY2RlXkEyXkFqcGc@._V1_QL75_UX140_CR0,12,140,140_.jpg",
	// 		films: {
	// 			create: [
	// 				{
	// 					film: {
	// 						connect: {
	// 							id: 3,
	// 						},
	// 					},
	// 				},
	// 			]
	// 		}
	// 	}
	// })

	// const actor9 = await prisma.actor.create({
	// 	data: {
	// 		name: "Judy Greer",
	// 		src: "https://m.media-amazon.com/images/M/MV5BMTg5MTAyMzMzMl5BMl5BanBnXkFtZTcwMDY2Mzc2NQ@@._V1_QL75_UX140_CR0,11,140,140_.jpg",
	// 		films: {
	// 			create: [
	// 				{
	// 					film: {
	// 						connect: {
	// 							id: 3,
	// 						},
	// 					},
	// 				},
	// 			]
	// 		}
	// 	}
	// })

	await userService.registerUser({
		name: "Serj",
		email: "serj@gmail.com",
		src: "https://masterpiecer-images.s3.yandex.net/a809a13ba68211eea092b2bae0cf569f:upscaled",
		password: "serjserj"
	})

	await userService.registerUser({
		name: "Roman",
		email: "roman@gmail.com",
		src: "https://masterpiecer-images.s3.yandex.net/1d9aa8e5833111eea173beb332dff282:upscaled",
		password: "romanroman"
	})

	await userService.registerUser({
		name: "SeRo",
		email: "sero@gmail.com",
		src: "https://masterpiecer-images.s3.yandex.net/bb429de19eed11eea139b646b2a0ffc1:upscaled",
		password: "serosero"
	})

	await userService.registerUser({
		name: "Tony",
		email: "tony@gmail.com",
		password: "12341234",
		role: "admin"
	})

	// const user1 = await prisma.user.create({
	// 	data: {
	// 		name: "Serj",
	// 		email: "serj@gmail.com",
	// 		src: "https://masterpiecer-images.s3.yandex.net/a809a13ba68211eea092b2bae0cf569f:upscaled",
	// 		password: "asasddasd"
	// 	}
	// })

	// const user2 = await prisma.user.create({
	// 	data: {
	// 		name: "Roman",
	// 		email: "roman@gmail.com",
	// 		src: "https://masterpiecer-images.s3.yandex.net/1d9aa8e5833111eea173beb332dff282:upscaled",
	// 		password: "asasddasd"

	// 	}
	// })

	// const user3 = await prisma.user.create({
	// 	data: {
	// 		name: "SeRo",
	// 		email: "sero@gmail.com",
	// 		src: "https://masterpiecer-images.s3.yandex.net/bb429de19eed11eea139b646b2a0ffc1:upscaled",
	// 		password: "asasddasd"
	// 	}
	// })

	// const user4 = await prisma.user.create({
	// 	data: {
	// 		name: "Tony",
	// 		email: "tony@gmail.com",
	// 		password: "asasddasd",
	// 		role: "admin"
	// 	}
	// })	

	const reviews = await prisma.review.createMany({
		data: [
			{
				name: "Cool",
				text: "The best film I have ever seen!",
				mark: 10,
				userId: 1,
				filmId: 1
			},
			{
				name: "Norm",
				text: "I have changed my mind: this film is quite mediocre.",
				mark: 6,
				userId: 1,
				filmId: 1
			},
			{
				name: "Meh",
				text: "Characters in this film are not playing great, I do not recommend this film.",
				mark: 4,
				userId: 1,
				filmId: 2
			},
			{
				name: "Ok",
				text: "Solid 6.",
				mark: 6,
				userId: 1,
				filmId: 3
			},


			{
				name: "Fine",
				text: "The greatest film of all times! 10/10",
				mark: 10,
				userId: 2,
				filmId: 2
			},
			{
				name: "Nah",
				text: "I didnt like it",
				mark: 3,
				userId: 2,
				filmId: 3
			},


			{
				name: "So-so",
				text: "I am not satisfied after watching this film.",
				mark: 5,
				userId: 3,
				filmId: 1
			}
		]
	})
}


createDataBase()
	.then(() => {
		prisma.$disconnect();
	})
	.catch((err) => {
		console.log(err);
		prisma.$disconnect();
	});
