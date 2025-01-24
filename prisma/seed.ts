import { Prisma, PrismaClient } from "@prisma/client";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";

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
			photo3: "https://m.media-amazon.com/images/M/MV5BNzM4OTlhZmUtMjUzMy00ZTkwLThlMzUtOGVhNjUyOTM4MjdhXkEyXkFqcGc@._V1_.jpghttps://m.media-amazon.com/images/M/MV5BNzM4OTlhZmUtMjUzMy00ZTkwLThlMzUtOGVhNjUyOTM4MjdhXkEyXkFqcGc@._V1_.jpg",
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


	const actor1 = await prisma.actor.create({
		data: {
			name: "Dwayne Johnson",
			src: "https://m.media-amazon.com/images/M/MV5BOWUzNzIzMzQtNzMxYi00OWRiLTlhZjEtZTRjYWVkYzI4ZjMwXkEyXkFqcGc@._V1_QL75_UX140_CR0,12,140,140_.jpg",
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

	const actor2 = await prisma.actor.create({
		data: {
			name: "Chris Evans",
			src: "https://m.media-amazon.com/images/M/MV5BNzQ0YWM1ODEtZDFkYy00MGJhLTkwZDUtMzVkZjljODU3ZTRmXkEyXkFqcGc@._V1_QL75_UX140_CR0,12,140,140_.jpg",
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


	const actor4 = await prisma.actor.create({
		data: {
			name: "Ralph Fiennes",
			src: "https://m.media-amazon.com/images/M/MV5BMzc5MjE1NDgyN15BMl5BanBnXkFtZTcwNzg2ODgwNA@@._V1_QL75_UX140_CR0,0,140,140_.jpg",
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
			src: "https://m.media-amazon.com/images/M/MV5BMDNhOTQ2ZTUtYWQ0Ny00ZjY3LTljNjUtNjVmYmZjNTEzZTllXkEyXkFqcGc@._V1_QL75_UX140_CR0,12,140,140_.jpg",
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

	

	const user1 = await prisma.user.create({
		data: {
			name: "Serj",
			src: "https://masterpiecer-images.s3.yandex.net/a809a13ba68211eea092b2bae0cf569f:upscaled",
		}
	})

	const user2 = await prisma.user.create({
		data: {
			name: "Roman",
			src: "https://masterpiecer-images.s3.yandex.net/1d9aa8e5833111eea173beb332dff282:upscaled",
		}
	})

	const user3 = await prisma.user.create({
		data: {
			name: "SeRo",
			src: "https://masterpiecer-images.s3.yandex.net/bb429de19eed11eea139b646b2a0ffc1:upscaled",
		}
	})


	const reviews = await prisma.review.createMany({
		data: [
			{
				text: "The best film I have ever seen!",
				mark: 10,
				userId: 1,
				filmId: 1
			},
			{
				text: "I have changed my mind: this film is quite mediocre.",
				mark: 6,
				userId: 1,
				filmId: 1
			},
			{
				text: "Characters in this film are not playing great, I do not recommend this film.",
				mark: 4,
				userId: 1,
				filmId: 2
			},
			{
				text: "Solid 6.",
				mark: 6,
				userId: 1,
				filmId: 3
			},


			{
				text: "The greatest film of all times! 10/10",
				mark: 10,
				userId: 2,
				filmId: 2
			},
			{
				text: "I didnt like it",
				mark: 3,
				userId: 2,
				filmId: 3
			},


			{
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
