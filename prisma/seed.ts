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
	


	const actor4 = await prisma.actor.create({
		data: {
			name: "Ralph Fiennes",
			src: "https://m.media-amazon.com/images/M/MV5BMzc5MjE1NDgyN15BMl5BanBnXkFtZTcwNzg2ODgwNA@@._V1_QL75_UX140_CR0,0,140,140_.jpg",
			bornInDate: "December 22, 1962",
			bornInCity: "Ipswich, Suffolk, England",
			bornInCountry: "UK",
			biography: "Actor Ralph Nathaniel Twisleton-Wykeham-Fiennes was born on December 22, 1962 in Suffolk, England, to Jennifer Anne Mary Alleyne (Lash), a novelist, and Mark Fiennes, a photographer. He is the eldest of six children. Four of his siblings are also in the arts: Martha Fiennes, a director; Magnus Fiennes, a musician; Sophie Fiennes, a producer; and Joseph Fiennes, an actor. He is of English, Irish, and Scottish origin. A noted Shakespeare interpreter, he first achieved success onstage at the Royal National Theatre. Fiennes first worked on screen in 1990 and then made his film debut in 1992 as Heathcliff in Emily Brontë's Грозовой перевал (1992), opposite Juliette Binoche. 1993 was his 'breakout year'. He had a major role in the controversial Peter Greenaway film Дитя Макона (1993), with Julia Ormond, which was poorly received. Later that year he became known internationally for portraying the amoral Nazi concentration camp commandant Amon Goeth in Steven Spielberg's Список Шиндлера (1993). For this he was nominated for the Academy Award for Best Supporting Actor and the Golden Globe Award for Best Supporting Actor. He did not win, but did win the Best Supporting Actor BAFTA Award for the role, as well as Best Supporting Actor honors from numerous critics groups, including the National Society of Film Critics, and the New York, Chicago, Boston, and London Film Critics associations. His portrayal as Göth also earned him a spot on the American Film Institute's list of Top 50 Film Villains. To look suitable to represent Goeth, Fiennes gained weight, but he managed to shed it afterwards. In 1994, he portrayed American academic Charles Van Doren in Телевикторина (1994). In 1996, he was nominated for the Academy Award for Best Actor for his performance as Count Almásy the World War II epic romance, and another Best Picture winner, Anthony Minghella's Английский пациент (1996), in which he starred with Kristin Scott Thomas. He also received BAFTA and Golden Globe nominations, as well as two Screen Actors Guild (SAG) Award nominations, one for Best Actor and another shared with the film's ensemble cast. Since then, Fiennes has been in a number of notable films, including Странные дни (1995), Оскар и Люсинда (1997), the animated Принц Египта (1998), István Szabó's Вкус солнечного света (1999), Neil Jordan-directed films Конец романа (1999) and Хороший вор (2002), Красный Дракон (2002), Госпожа горничная (2002), Преданный садовник (2005), Залечь на дно в Брюгге (2008), Чтец (2008), co-starring Kate Winslet, Kathryn Bigelow's Oscar®-winning Повелитель бури (2008), Битва титанов (2010), Mike Newell's screen adaptation of Charles Dickens'Большие надежды (2012), with Helena Bonham Carter and Jeremy Irvine, and Wes Anderson's Отель «Гранд Будапешт» (2014).He is also known for his roles in major film franchises such as the Harry Potter film series (2005-2011), in which he played the evil Lord Voldemort. His nephew, Hero Fiennes Tiffin played Tom Riddle, the young Lord Voldemort, in Гарри Поттер и Принц-полукровка (2009). Ralph also appears in the James Bond series, in which he has played M, starting with the 2012 film 007: Координаты «Скайфолл» (2012). In 2011, Fiennes made his directorial debut with his film adaptation of Shakespeare's tragedy political thriller Кориолан (2011), in which he also played the title character, opposite Gerard Butler and Vanessa Redgrave. Fiennes has won a Tony Award for playing Prince Hamlet on Broadway. In 2015, Fiennes played a music producer in Luca Guadagnino's Большой всплеск (2015), starring opposite Tilda Swinton and Matthias Schoenaerts, and in 2016, Fiennes starred in Joel and Ethan Coen's Да здравствует Цезарь! (2016). Since 1999, Fiennes has served as an ambassador for UNICEF UK.",
			height: "1.8 m",
			mother: "Jennifer Anne Mary Alleyne Lash",
			father: "Mark Fiennes",
			films: {
				create: [
					{
						film: {
							connect: {
								id: 2,
							},
						},
					},
				]
			}
		}
	})

	const actor5 = await prisma.actor.create({
		data: {
			name: "Stanley Tucci",
			src: "https://m.media-amazon.com/images/M/MV5BMTU1MzE4MjAzMV5BMl5BanBnXkFtZTcwMjA2MTMyMw@@._V1_QL75_UX140_CR0,3,140,140_.jpg",
			bornInDate: "November 11, 1960",
			bornInCity: "Peekskill, New York",
			bornInCountry: "USA",
			biography: `Actor Stanley Tucci was born on November 11, 1960, in Peekskill, New York. He is the son of Joan (Tropiano), a writer, and Stanley Tucci, an art teacher. His family is Italian-American, with origins in Calabria. Tucci took an interest in acting while in high school, and went on to attend the State University of New York's Conservatory of Theater Arts in Purchase. He began his professional career on the stage, making his Broadway debut in 1982, and then made his film debut in Честь семьи Прицци (1985). In 2009, Tucci received his first Academy Award nomination for his turn as a child murderer in Милые кости (2009). He also received a BAFTA nomination and a Golden Globe nomination for the same role. Other than The Lovely Bones, Tucci has recently had noteworthy supporting turns in a broad range of movies including Счастливое число Слевина (2006), Дьявол носит Prada (2006) and Первый мститель (2011). Tucci reached his widest audience yet when he played Caesar Flickerman in box office sensation Голодные игры (2012). While maintaining an active career in movies, Tucci received major accolades for some work in television. He won an Emmy and a Golden Globe for his role in TV movie Крёстный отец эфира (1998), an Emmy for a guest turn on Дефективный детектив (2002), and a Golden Globe for his role in HBO movie Заговор (2001). Tucci has also had an extensive career behind the camera. His directorial efforts include Большая ночь (1996), Самозванцы (1998), Секрет Джо Гулда (2000) and Свидание вслепую (2007), and he did credited work on all of those screenplays with the exception of Секрет Джо Гулда (2000). Tucci has three children with Kate Tucci, who passed away in 2009. Tucci married Felicity Blunt in August 2012.`,
			height: "1.72 m",
			mother: "Joan Tucci",
			father: "Stanley Tucci",
			films: {
				create: [
					{
						film: {
							connect: {
								id: 2,
							},
						},
					},
				]
			}
		}
	})

	const actor6 = await prisma.actor.create({
		data: {
			name: "John Lithgow",
			src: "https://m.media-amazon.com/images/M/MV5BMTQzMzUyNDkzNF5BMl5BanBnXkFtZTcwNTMwNTU5MQ@@._V1_QL75_UX140_CR0,0,140,140_.jpg",
			bornInDate: "October 19, 1945",
			bornInCity: "Rochester, New York",
			bornInCountry: "USA",
			biography: `If "born to the theater" has meaning in determining a person's life path, then John Lithgow is a prime example of this truth. He was born in Rochester, New York, to Sarah Jane (Price), an actress, and Arthur Washington Lithgow III, who was both a theatrical producer and director. John's father was born in Puerto Plata, Dominican Republic, where the Anglo-American Lithgow family had lived for several generations. John moved frequently as a child, while his father founded and managed local and college theaters and Shakespeare festivals throughout the Midwest of the United States. Not until he was 16, and his father became head of the McCarter Theater in Princeton New Jersey, did the family settle down. But for John, the theater was still not a career. He won a scholarship to Harvard University, where he finally caught the acting bug (as well as found a wife). Harvard was followed by a Fulbright scholarship to study at the London Academy of Music and Dramatic Art. Returning from London, his rigorous dramatic training stood him in good stead, and a distinguished career on Broadway gave him one Tony Award for "The Changing Room", a second nomination in 1985 for "Requiem For a Heavyweight", and a third in 1988 for "M. Butterfly". But with critical acclaim came personal confusion, and in the mid 1970s, he and his wife divorced. He entered therapy, and in 1982, his life started in a new direction, the movies - he received an Academy Award nomination for his portrayal of Roberta Muldoon in Мир по Гарпу (1982). A second Oscar nomination followed for Язык нежности (1983), and he met a UCLA economics professor who became his second wife. As the decade of the 1990s came around, he found that he was spending too much time on location, and another career move brought him to television in the hugely successful series Третья планета от Солнца (1996). This production also played a role in bringing him back together with the son from his first marriage, Ian Lithgow, who has a regular role in the series as a dimwitted student.`,
			height: "1.93 m",
			mother: "Sarah Jane Price",
			father: "Arthur Washington Lithgow III",
			films: {
				create: [
					{
						film: {
							connect: {
								id: 2,
							},
						},
					},
				]
			}
		}
	})

	const actor7 = await prisma.actor.create({
		data: {
			name: "Kynlee Heiman",
			src: "https://m.media-amazon.com/images/M/MV5BM2UxODM2ZTEtMmU1Mi00ODAwLWJjMTgtYjQ1OTQ2YWI5NjUzXkEyXkFqcGc@._V1_QL75_UX140_CR0,12,140,140_.jpg",
			bornInDate: "October 13, 2016",
			bornInCity: "Los Angeles, California",
			bornInCountry: "USA",
			biography: `Kynlee is an American Actress who is best known for her social media presence. Kynlee's acting career started at the age of 5 with a Target commercial. Kynlee has been in many commercials in her young career as well as print work. Kynlee has walked in New York fashion week for a top children's fashion brand. Kynlee is a well known social media influencer who inspires many with her amazing gymnastics talents and fitness. Kynlee's has had the leading role in several short films. Kynlee is excited for the release of her first feature film The Best Christmas Pageant Ever coming soon to Theaters this November. Kynlee is one to watch for a star in the making with her rare combination of red hair and blue eyes, she is unforgettable. Kynlee's is wise beyond her years and displays her wide range of acting ability and puts her heart and soul into every project she's involved with.`,
			height: "1.52 m",
			mother: "Kristin Heiman",
			father: "Kyle Heiman",
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

	const actor8 = await prisma.actor.create({
		data: {
			name: "Sebastian Billingsley-Rodriguez",
			src: "https://m.media-amazon.com/images/M/MV5BNjcyYzFkYjAtYjYwNy00ZDRmLTlmNWQtMmNjMmZiYTMyY2RlXkEyXkFqcGc@._V1_QL75_UX140_CR0,12,140,140_.jpg",
			bornInDate: "March 5, 2013",
			bornInCity: "Toronto",
			bornInCountry: "Canada",
			biography: `Sebastian Billingsley-Rodriguez is a talented 11-year-old actor who made his debut in the entertainment world at the age of 3 in Noah Hawley's TV series, "Legion". Since then, he has graced both the small and big screens. On television, Sebastian has showcased his versatility with roles in popular shows like "The Magicians," "The X-Files," "Nancy Drew," "When Calls the Heart," "BH90210," and "The Babysitter's Club." He has also lent his voice to beloved animated series on Netflix, such as "CoComelon Lane," "Wonderoos," and "Deepa & Anoop". In the world of movies, Sebastian has acted in notable films like the Disney+ movie, "Peter Pan and Wendy," directed by David Lowry, where he shared the screen with Jude Law and Yara Shahidi. Additionally, he appeared in the Netflix film, "Love, Guaranteed," alongside Rachel Leigh Cook and Damon Wayans Jr. One of his favorite roles includes the supernatural horror film, "Bed Rest," where he acted alongside Melissa Barrera. Prior to these, Sebastian starred in several Christmas-themed films like "Christmas on the Vine," "You Light Up My Christmas," "Sweet Mountain Christmas," and "Christmas on the Vine," showcasing his versatility across genres.Sebastian's talent has been recognized with various accolades, including nine Young Artist Academy Award Nominations and multiple wins. He has also been honored at The Young Entertainer Awards, solidifying his status as a rising star in the industry. Outside of his acting career, Sebastian enjoys spending time with his family and friends and pursuing his passions. He is an avid animal lover and enjoys activities like karate, swimming, reading, playing video games, collecting Hot Wheels, and watching "Scooby-Doo." Sebastian is excited about his upcoming role in Lionsgate's/Kingdom Story Company's feature film, "The Best Christmas Pageant Ever," directed by Dallas Jenkins, where he plays Charlie Bradley alongside Judy Greer, Pete Holms, Lauren Graham, and Molly Belle Wright. With his dedication, passion, and talent, Sebastian continues to make waves in the entertainment industry and is poised for a bright future.`,
			height: "1.52 m",
			mother: "Martha Rodriguez",
			father: "Sebastian Billingsley",
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

	const actor9 = await prisma.actor.create({
		data: {
			name: "Judy Greer",
			src: "https://m.media-amazon.com/images/M/MV5BMTg5MTAyMzMzMl5BMl5BanBnXkFtZTcwMDY2Mzc2NQ@@._V1_QL75_UX140_CR0,11,140,140_.jpg",
			bornInDate: "July 20, 1975",
			bornInCity: "Detroit, Michigan",
			bornInCountry: "USA",
			biography: `Judy Greer was born and raised outside of Detroit, Michigan, as Judith Therese Evans. She is the daughter of Mollie Ann (née Greer), a hospital administrator and former nun, and Richard Evans, a mechanical engineer. She has German, Irish, English, Welsh, and Scottish ancestry. After training for nearly ten years in classical Russian ballet, Greer shifted her interest to acting and was accepted into Chicago's prestigious Theatre School at DePaul University. After a variety of odd jobs during college, from telemarketer to oyster shucker, Greer landed her first on-screen role just three days after graduation -- a small part in the Jason Lee-David Schwimmer comedy Поцелуй понарошку (1998). She flew to Los Angeles for the film's premiere and never left. Greer quickly landed a role in the dark comedy Королевы убийства (1999), with Rose McGowan and Rebecca Gayheart. Greer starred as a school wallflower-turned-babe in a story about high school girls who accidentally kill their best friend and try to cover up the murder. She went on to play a news correspondent in David O. Russell's Три короля (1999), landing a memorable opening love scene with George Clooney. Her performance caught the eye of Hollywood, and she appeared next in Mike Nichols's С какой ты планеты? (2000) as a flight attendant opposite Garry Shandling. Her television credits include a recurring role as Jason Bateman's assistant Kitty on Fox's Задержка в развитии (2003), as well as guest-starring roles on Love & Money (1999), Maggie Winters (1998), and Завтра наступит сегодня (1996). Greer starred opposite Jennifer Garner in Columbia Pictures' romantic comedy Из 13 в 30 (2004), directed by Gary Winick. Greer played an office colleague alongside Garner's character, with whom she shares a checkered past. She co-starred in writer-director M. Night Shyamalan's Таинственный лес (2004), opposite Joaquin Phoenix, Adrien Brody, Bryce Dallas Howard, Sigourney Weaver, and William Hurt. Set in 1897, the film revolves around a close-knit community that lives with the knowledge that a mythical race of creatures resides in the woods surrounding them. Таинственный лес (2004) was released July 30, 2004, by Touchtone Pictures. Greer also co-starred in director Wes Craven's Оборотни (2005), a modern twist on the classic werewolf tale written by Kevin Williamson. The busy actress also landed a co-starring role opposite Orlando Bloom and Susan Sarandon in writer-director Cameron Crowe's Элизабеттаун (2005), playing the sister of Bloom's character and daughter of Sarandon's character. She also joined Jeff Bridges and Jeanne Tripplehorn in the independent film Магнаты (2005) by writer-director Michael Traeger. The film revolves around a motley group of friends who band together to make an amateur porn film. Greer plays a young temptress at the local mattress store who secures a role in the movie by allowing the store to be used as a film location. Greer wrapped production in New York on a co-starring role opposite Tom McCarthy ("The Station Agent") in Danny Leiner's Великое новое чудо (2005) for Serenade Films/Sly Dog Films. The dark comedy tells five different stories against the backdrop of an uncertain post-September 11 New York. The cast also includes Maggie Gyllenhaal, Edie Falco and Tony Shalhoub. She also appeared in writer-director Adam Goldberg's psychological drama Две жизни Грея Эванса (2003), opposite Giovanni Ribisi. The film is about a fictional movie star (Ribisi) and his gradual meltdown and increasing obsession with a young film student and his girlfriend. The stellar cast also included Franka Potente, Christina Ricci, and Jason Lee and debuted at the 2003 Toronto International Film Festival. In the film, Greer plays Samantha, the personal assistant of Ribisi's character. Greer had a starring role as the female lead role in the comedy Убойный молот (2003) as the feisty, fearless Esther, who joins forces with an Orthodox Jewish Blaxploitation hero (Adam Goldberg) to save Hanukkah from an evil son of Santa Claus (Andy Dick). Убойный молот (2003) debuted at the 2003 Sundance Film Festival and premiered on Comedy Central followed by a theatrical release. She also appeared in Адаптация (2002), from director Spike Jonze. In the film, Nicolas Cage stars as self-loathing writer Charlie Kaufman (and twin brother Donald) as he attempts to adapt the novel "The Orchid Thief" for the big screen. Greer played Alice, the waitress with whom he becomes obsessed -- the object of his fantasies. Greer turned in a scene-stealing comedic performance in Свадебный переполох (2001), with Jennifer Lopez and Matthew McConaughey, in which she played Penny, Lopez's sweet but ditsy assistant who tries hard, but often falls a little short. Equally adept at more dramatic roles, Greer gave a standout performance opposite Mel Gibson in Чего хотят женщины (2000), playing a suicidal file clerk rescued by the one man who can hear women's thoughts. Greer's pivotal scene with Gibson is the heart of the film. With a genuine gift for comedy and an engaging on-screen presence, Judy Greer has quickly become one of Hollywood's most captivating talents. Having appeared in such diverse films as Королевы убийства (1999), Чего хотят женщины (2000), Свадебный переполох (2001), Адаптация (2002), and Уилсон (2017) as well as a number of upcoming feature film projects, Greer turns in scene-stealing performances opposite some of the industry's biggest stars.`,
			height: '1.7 m',
			mother: "Annie Greer",
			father: "Richard Evans",
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

	await userService.registerUser({
		name: "Serj",
		email: "serj@gmail.com",
		src: "https://masterpiecer-images.s3.yandex.net/a809a13ba68211eea092b2bae0cf569f:upscaled",
		password: "serjserj",
		age: 88
	})

	await userService.registerUser({
		name: "Roman",
		email: "roman@gmail.com",
		src: "https://masterpiecer-images.s3.yandex.net/1d9aa8e5833111eea173beb332dff282:upscaled",
		password: "romanroman",
		age: 98
	})

	await userService.registerUser({
		name: "SeRo",
		email: "sero@gmail.com",
		src: "https://masterpiecer-images.s3.yandex.net/bb429de19eed11eea139b646b2a0ffc1:upscaled",
		password: "serosero",
		age: 12
	})

	await userService.registerUser({
		name: "Tony",
		email: "tony@gmail.com",
		password: "12341234",
		role: "admin",
		age: 34
	})

	await prisma.favouriteFilmsOnUsers.createMany({
		data: [
			{
				userId: 1,
				filmId: 1
			},
			{
				userId: 1,
				filmId: 2
			},
			{
				userId: 1,
				filmId: 4
			},
			{
				userId: 1,
				filmId: 6
			},
			{
				userId: 1,
				filmId: 7
			}
		]
	})


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
