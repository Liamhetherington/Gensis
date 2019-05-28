exports.seed = function(knex, Promise) {
	return knex("resource")
		.del()
		.then(function() {
			return Promise.all([
				knex("resource").insert({
					id: 1,
					title: "Ghost Lead",
					date_created: "10/24/2018",
					url:
						"http://www.blabbermouth.net/news/former-ghost-members-shoot-down-tobias-forges-solo-project-claim/",
					description: "SOLO project",
					thumbnail:
						"http://assets.blabbermouth.net/media/ghostband2015promo_638.jpg"
				}),
				knex("resource").insert({
					id: 2,
					title: "Sink in Music Video",
					date_created: "11/27/2018",
					url: "https://www.youtube.com/watch?v=a_xJoSE3UqE",
					description: "Sink in by GHOST",
					thumbnail:
						"https://i.ytimg.com/vi/a_xJoSE3UqE/maxresdefault.jpg"
				}),
				knex("resource").insert({
					id: 3,
					title: "Ghost Reveals",
					date_created: "03/22/2019",
					url:
						"https://www.ultimate-guitar.com/news/general_music_news/tobias_forge_admits_ghost_hasnt_made_any_money_whatsoever_from_hundreds_of_concerts_the_only_thing_that_sustained_this_band_are_t-shirt_sales.html",
					description:
						"Tobias Forge Admits Ghost Hasn't Made 'Any Money Whatsoever' From Hundreds of Concerts: The Only Thing That Sustained This Band Are T-Shirt Sales",
					thumbnail:
						"https://www.ultimate-guitar.com/static/article/news/8/83178_0_wide_ver1544607795.jpg@642"
				}),
				knex("resource").insert({
					id: 4,
					title: "Ghost is the smartest band in the world",
					date_created: "04/24/2019",
					url:
						"https://www.chron.com/entertainment/music/article/Ghost-is-the-smartest-band-in-the-world-12881320.php",
					description:
						"Swedish quasi-metal band Ghost, which covers the faces of its musicians with masks that have no mouths and two horns, has the most intelligent act in rock.",
					thumbnail:
						"https://s.hdnux.com/photos/73/05/54/15489854/3/480x480.jpg"
				}),
				knex("resource").insert({
					id: 5,
					title:
						"How Lemmy, David Bowie and Prince inspired new Ghost lp",
					date_created: "05/24/2019",
					url:
						"https://ultimateclassicrock.com/how-lemmy-david-bowie-and-prince-inspired-new-ghost-lp/",
					description: "Amazing rock influences, cross genre",
					thumbnail:
						"https://townsquare.media/site/295/files/2018/04/LemmyBowiePrinceGhost.jpg"
				}),
				knex("resource").insert({
					id: 6,
					title: "EJS ",
					date_created: "05/24/2019",
					url: "https://ejs.co/",
					description: "Embedded JavaScript templating. Get Started!",
					thumbnail:
						"https://cdn-images-1.medium.com/max/1600/1*5xR5P6dzu4LpyMaR2QMphA.jpeg"
				}),
				knex("resource").insert({
					id: 7,
					title: "How will coding be relevant in the future?",
					date_created: "05/26/2019",
					url:
						"https://hackernoon.com/how-will-coding-be-relevant-in-the-future-74594c2b015f",
					description: "What is coding anyway?",
					thumbnail:
						"https://cdn-images-1.medium.com/max/1600/1*6W5eurFhYPpwNbRbqNImgQ.jpeg"
				}),
				knex("resource").insert({
					id: 8,
					title:
						"Goth Food Is the Latest Instagram Trend and We Can't Look Away",
					date_created: "02/24/2019",
					url:
						"https://www.shape.com/healthy-eating/meal-ideas/black-goth-foods-instagram",
					description:
						"Say goodbye to mermaids and unicorns—these black foods are about to take over your Instagram feed.",
					thumbnail:
						"https://images.shape.mdpcdn.com/sites/shape.com/files/styles/slide/public/goth-charcoal-ice-cream-little-damage.jpg"
				}),
				knex("resource").insert({
					id: 9,
					title:
						"THE ULTIMATE GOTH COOKBOOK FOR RECIPES AS DARK AS YOUR SOUL",
					date_created: "07/24/2019",
					url:
						"https://www.altpress.com/features/goth_recipes_cookbook/",
					description:
						"Goth lemonade and black-as-your-soul ice cream cones might have seemed like the peak of the goth treat hype, but the truth is, the foodie world was just getting started.",
					thumbnail:
						"http://media.altpress.com/uploads/2018/06/goth_cookbook.jpg"
				}),
				knex("resource").insert({
					id: 10,
					title: "Basics of Interior Design",
					date_created: "03/24/2019",
					url:
						"https://medium.com/learning-about-interior-design/how-to-use-plants-in-the-interior-3926fcc9fec7",
					description:
						"There’s nothing like an indoor tree in a room. It immediately brings the outside in, making the room feel fresh and more alive.",
					thumbnail:
						"https://cdn-images-1.medium.com/max/2600/1*zycJdgMbLw3jODarBkR-PA.jpeg"
				}),
				knex("resource").insert({
					id: 11,
					title: "The Foundations of Computer Design",
					date_created: "02/24/2019",
					url:
						"https://www.udemy.com/the-foundations-of-computer-design/",
					description: "Basics to computer design",
					thumbnail:
						"https://i.udemycdn.com/course/750x422/1164182_d150.jpg"
				}),
				knex("resource").insert({
					id: 12,
					title: "Lighthouse Labs",
					date_created: "02/24/2018",
					url:
						"https://www.lighthouselabs.ca/?gclid=Cj0KCQjwla7nBRDxARIsADll0kBNlR-L1hC5iA2JOmb7pW6zkGjXv-sS6GPfXpe7-2CMDdxh_BG-MeQaAi9jEALw_wcB",
					description: "Learn to code really well",
					thumbnail:
						"https://pbs.twimg.com/profile_images/378800000328970347/40e96c650dad499b060a4f24ddc68c6e_400x400.png"
				}),
				knex("resource").insert({
					id: 13,
					title: "Baku Hosts Street Food Festival",
					date_created: "03/24/2018",
					url:
						"https://caspiannews.com/news-detail/baku-hosts-street-food-festival-2018-6-12-57/",
					description: "Baku third annual street festival",
					thumbnail:
						"https://caspiannews.com/media/caspian_news/all_original_photos/1528831479_7183783_1528831390_5761793SFF-Foto-2018-001web2.jpg"
				}),
				knex("resource").insert({
					id: 14,
					title:
						"What’s in Season in Fall? The Top 10 Healthiest Fruits and Vegetables",
					date_created: "01/24/2019",
					url:
						"https://foodrevolution.org/blog/fall-fruits-vegetables/",
					description:
						"Thanks to global importation, most fruits and vegetables are available in supermarkets year round. So why should you seek out seasonal produce?",
					thumbnail:
						"https://foodrevolution.org/wp-content/uploads/2018/10/blog-featured-fall_foods-20181015.jpg"
				}),
				knex("resource").insert({
					id: 15,
					title: "CODEPEN",
					date_created: "02/24/2018",
					url: "https://codepen.io/",
					description:
						"CodePen is a social development environment for front-end designers and developers.",
					thumbnail:
						"https://s3.amazonaws.com/media.eremedia.com/wp-content/uploads/2018/05/31112343/Codepen.png"
				}),
				knex("resource").insert({
					id: 16,
					title: "Gothic Metal Artists",
					date_created: "05/24/2019",
					url: "https://www.last.fm/tag/gothic+metal/artists",
					description: "Top 100 metal artists from Scandinavia",
					thumbnail:
						"https://lastfm-img2.akamaized.net/i/u/270x205/ee40dda2851130a4b4a1700ddb674a5f.jpg"
				}),
				knex("resource").insert({
					id: 17,
					title: "La Carmina",
					date_created: "05/26/2019",
					url:
						"https://www.lacarmina.com/blog/2010/01/my-all-girl-spooky-japanese-goth-band-scary-visual-kei-makeup-black-lipstick-gothic-girls-outside-trash-vaudeville-nyc/",
					description:
						"ALL-GIRL SPOOKY JAPANESE GOTH BAND! SCARY VISUAL KEI MAKEUP, BLACK LIPSTICK, GOTHIC GIRLS ",
					thumbnail:
						"https://images.lacarmina.com/110830_goth_parties_tokyo_japan_clubs_bands_gothic_ebm_industrial_1.jpg"
				}),
				knex("resource").insert({
					id: 18,
					title: "Fry it Up",
					date_created: "05/24/2018",
					url:
						"https://www.bbcgoodfood.com/howto/guide/easy-finger-food-ideas",
					description:
						"Chicken Wings and other easy finger foods, for your summer BBQ",
					thumbnail:
						"https://www.bbcgoodfood.com/sites/default/files/guide/guide-image/2018/06/chicken-wings-main.jpg"
				}),
				knex("resource").insert({
					id: 19,
					title: "Empowering you to achieve better outcomes",
					date_created: "05/24/2019",
					url: "https://www.smarttech.com/",
					description:
						"Our technology solutions and services help you achieve better outcomes, whether it’s improving student learning or making teams more productive.",
					thumbnail:
						"https://blog.off2class.com/wp-content/uploads/2016/02/interactive-white-board.png"
				}),
				knex("resource").insert({
					id: 20,
					title:
						"The expanding role of design in creating an end-to-end customer experience",
					date_created: "05/24/2019",
					url:
						"https://www.mckinsey.com/business-functions/operations/our-insights/the-expanding-role-of-design-in-creating-an-end-to-end-customer-experience",
					description:
						"Lines between products, services, and user environments are blurring. The ability to craft an integrated customer experience will open enormous opportunities to build new businesses.",
					thumbnail:
						"https://www.mckinsey.com/~/media/McKinsey/Business%20Functions/Operations/Our%20Insights/The%20expanding%20role%20of%20design%20in%20creating%20an%20end%20to%20end%20customer%20experience/Expanding-role-of-design-1536x1536-400_Standard.ashx"
				})
			]);
		});
};
