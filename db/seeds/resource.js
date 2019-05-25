exports.seed = function(knex, Promise) {
	return knex("resource")
		.del()
		.then(function() {
			return Promise.all([
				knex("resource").insert({
					id: 1,
					title: "Ghost Lead",
					date_created: "05/24/2019",
					url:
						"http://www.blabbermouth.net/news/former-ghost-members-shoot-down-tobias-forges-solo-project-claim/",
					description: "SOLO project",
					thumbnail:
						"http://assets.blabbermouth.net/media/ghostband2015promo_638.jpg"
				}),
				knex("resource").insert({
					id: 2,
					title: "Sink in Music Video",
					date_created: "05/24/2019",
					url: "https://www.youtube.com/watch?v=a_xJoSE3UqE",
					description: "Sink in by GHOST",
					thumbnail:
						"https://i.ytimg.com/vi/a_xJoSE3UqE/maxresdefault.jpg"
				}),
				knex("resource").insert({
					id: 3,
					title: "Ghost Reveals",
					date_created: "05/24/2019",
					url:
						"https://www.ultimate-guitar.com/news/general_music_news/tobias_forge_admits_ghost_hasnt_made_any_money_whatsoever_from_hundreds_of_concerts_the_only_thing_that_sustained_this_band_are_t-shirt_sales.html",
					description:
						"Tobias Forge Admits Ghost Hasn't Made 'Any Money Whatsoever' From Hundreds of Concerts: The Only Thing That Sustained This Band Are T-Shirt Sales",
					thumbnail:
						"https://www.ultimate-guitar.com/static/article/news/8/83178_0_wide_ver1544607795.jpg@642"
				})
				// knex("resource").insert({
				// 	id: 4,
				// 	title: "title",
				// 	date_created: "1558828800",
				// 	url: "",
				// 	description: "",
				// 	thumbnail: "",
				// 	users_id: ""
				// }),
				// knex("resource").insert({
				// 	id: 5,
				// 	title: "title",
				// 	date_created: "1558828800",
				// 	url: "",
				// 	description: "",
				// 	thumbnail: "",
				// 	users_id: ""
				// })
			]);
		});
};
