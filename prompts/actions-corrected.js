// Don't Panic — Corrected ACTIONS array
// Source: Don't Panic by Ian McBurney, 2 July 2026 final version
// All personal and community actions drawn directly from the book.
// Political actions drawn from the political focus described in each chapter.
//
// Structure: { id, title, theme, actionType, cost, impact, moneyAngle? }
//   theme:      transport | energy | stuff | nature | food | money
//   actionType: personal | community | political
//   cost:       1 (free) → 5 (expensive)
//   impact:     1 (small) → 5 (large)
//   moneyAngle: 'save' | 'invest' (optional, used in money chapter view)

const ACTIONS = [

  // ─── TRANSPORT ─────────────────────────────────────────────────────────────

  // Personal
  { id: 'try-walking',              title: 'Try walking',                                         theme: 'transport', actionType: 'personal',   cost: 1, impact: 1 },
  { id: 'try-riding-a-bike',        title: 'Try riding a bike',                                   theme: 'transport', actionType: 'personal',   cost: 1, impact: 1 },
  { id: 'try-catching-a-bus',       title: 'Try catching a bus',                                  theme: 'transport', actionType: 'personal',   cost: 1, impact: 1 },
  { id: 'try-a-train',              title: 'Try a train',                                         theme: 'transport', actionType: 'personal',   cost: 1, impact: 1 },
  { id: 'get-bike-ready',           title: 'Get bike ready',                                      theme: 'transport', actionType: 'personal',   cost: 1, impact: 2 },
  { id: 'drop-kids-500m',           title: 'Drop the kids 500m from school',                      theme: 'transport', actionType: 'personal',   cost: 1, impact: 2, moneyAngle: 'save' },
  { id: 'drive-less',               title: 'Drive less, drive smooth, service often',              theme: 'transport', actionType: 'personal',   cost: 1, impact: 2, moneyAngle: 'save' },
  { id: 'buy-a-bike',               title: 'Buy a bike',                                          theme: 'transport', actionType: 'personal',   cost: 2, impact: 2 },
  { id: 'walk-often',               title: 'Walk often',                                          theme: 'transport', actionType: 'personal',   cost: 1, impact: 3 },
  { id: 'ride-often',               title: 'Ride often',                                          theme: 'transport', actionType: 'personal',   cost: 1, impact: 3 },
  { id: 'catch-bus-or-train',       title: 'Catch a regular bus or train',                        theme: 'transport', actionType: 'personal',   cost: 1, impact: 3 },
  { id: 'test-walk-ride-bus-train', title: 'Test a combination of walking, riding, bus and train to work', theme: 'transport', actionType: 'personal', cost: 1, impact: 2 },
  { id: 'use-car-sharing',          title: 'Use car sharing',                                     theme: 'transport', actionType: 'personal',   cost: 3, impact: 3 },
  { id: 'get-an-e-bike',            title: 'Get an e-bike',                                       theme: 'transport', actionType: 'personal',   cost: 2, impact: 4, moneyAngle: 'invest' },
  { id: 'move-closer-to-work',      title: 'Move closer to work, school and shops',               theme: 'transport', actionType: 'personal',   cost: 4, impact: 4 },
  { id: 'ditch-one-car',            title: 'Sell a car',                                          theme: 'transport', actionType: 'personal',   cost: 1, impact: 4, moneyAngle: 'save' },
  { id: 'ditch-two-cars',           title: 'Sell two cars',                                       theme: 'transport', actionType: 'personal',   cost: 1, impact: 5, moneyAngle: 'save' },
  { id: 'buy-an-ev',                title: 'Buy an EV',                                           theme: 'transport', actionType: 'personal',   cost: 5, impact: 5, moneyAngle: 'invest' },
  { id: 'conversations-transport',  title: 'Teach and learn — have change conversations',         theme: 'transport', actionType: 'personal',   cost: 1, impact: 3 },
  { id: 'write-council-transport',  title: 'Write to your local paper and Council',               theme: 'transport', actionType: 'personal',   cost: 1, impact: 3 },

  // Community
  { id: 'walk-ride-colleague',      title: 'Walk or ride to work with a colleague',               theme: 'transport', actionType: 'community',  cost: 1, impact: 2 },
  { id: 'share-bike-neighbours',    title: 'Share a bike between neighbours',                     theme: 'transport', actionType: 'community',  cost: 1, impact: 2 },
  { id: 'bus-train-with-friend',    title: 'Catch a bus or train with a friend',                  theme: 'transport', actionType: 'community',  cost: 1, impact: 2 },
  { id: 'share-car-trip',           title: 'Share a car trip with a friend',                      theme: 'transport', actionType: 'community',  cost: 1, impact: 2 },
  { id: 'join-community-bike',      title: 'Join a community bike ride or walking group',         theme: 'transport', actionType: 'community',  cost: 1, impact: 3 },
  { id: 'walking-meeting',          title: 'Have a walking meeting at work',                      theme: 'transport', actionType: 'community',  cost: 1, impact: 2 },
  { id: 'join-cycling-group',       title: 'Join a community cycling group',                      theme: 'transport', actionType: 'community',  cost: 1, impact: 3 },
  { id: 'share-cycling-stories',    title: 'Follow and share inspiring cycling stories online',   theme: 'transport', actionType: 'community',  cost: 1, impact: 2 },
  { id: 'show-ev-festival',         title: 'Show your electric car and e-bike at the local sustainability festival', theme: 'transport', actionType: 'community', cost: 1, impact: 3 },
  { id: 'report-unsafe-routes',     title: 'Report unsafe walking and cycling routes to your local Council', theme: 'transport', actionType: 'community', cost: 1, impact: 3 },
  { id: 'create-cycling-advocacy',  title: 'Create a cycling advocacy group',                     theme: 'transport', actionType: 'community',  cost: 1, impact: 4 },
  { id: 'join-transport-users',     title: 'Join the local public transport users association and advocate together', theme: 'transport', actionType: 'community', cost: 1, impact: 4 },
  { id: 'set-up-car-sharing',       title: 'Set up a car sharing cooperative',                    theme: 'transport', actionType: 'community',  cost: 2, impact: 4 },
  { id: 'bike-enterprise',          title: 'Set up an enterprise fixing donated bikes for local families who need them', theme: 'transport', actionType: 'community', cost: 2, impact: 4 },

  // Political
  { id: 'advocate-train-bus',       title: 'Campaign for electric train and bus infrastructure', theme: 'transport', actionType: 'political',  cost: 1, impact: 5 },
  { id: 'advocate-bike-lanes',      title: 'Advocate for more bike lanes and safe walking paths', theme: 'transport', actionType: 'political', cost: 1, impact: 5 },
  { id: 'support-transport-policy', title: 'Support candidates with strong public transport policies', theme: 'transport', actionType: 'political', cost: 1, impact: 4 },
  { id: 'write-mp-transport',       title: 'Write to your MP about transport infrastructure',    theme: 'transport', actionType: 'political',  cost: 1, impact: 4 },


  // ─── ENERGY ────────────────────────────────────────────────────────────────

  // Personal
  { id: 'try-less-power',           title: 'Try using less power',                               theme: 'energy', actionType: 'personal',   cost: 1, impact: 1, moneyAngle: 'save' },
  { id: 'install-energy-meter',     title: 'Install an energy meter',                            theme: 'energy', actionType: 'personal',   cost: 1, impact: 1 },
  { id: 'open-windows',             title: 'Open windows on summer nights',                      theme: 'energy', actionType: 'personal',   cost: 1, impact: 3, moneyAngle: 'save' },
  { id: 'dress-up-heater',          title: 'Dress up to keep the heater down',                   theme: 'energy', actionType: 'personal',   cost: 1, impact: 3, moneyAngle: 'save' },
  { id: 'shorter-showers',          title: 'Have shorter showers',                               theme: 'energy', actionType: 'personal',   cost: 1, impact: 3, moneyAngle: 'save' },
  { id: 'heat-spaces',              title: 'Heat the spaces you\'re in',                         theme: 'energy', actionType: 'personal',   cost: 1, impact: 3, moneyAngle: 'save' },
  { id: 'seal-gaps',                title: 'Seal all gaps in doors and windows',                 theme: 'energy', actionType: 'personal',   cost: 1, impact: 3, moneyAngle: 'save' },
  { id: 'led-lights',               title: 'Change the lights to LED',                           theme: 'energy', actionType: 'personal',   cost: 1, impact: 3, moneyAngle: 'save' },
  { id: 'buy-green-power',          title: 'Buy green power',                                    theme: 'energy', actionType: 'personal',   cost: 1, impact: 3 },
  { id: 'deciduous-vine',           title: 'Grow a deciduous tree or vine on the north west',   theme: 'energy', actionType: 'personal',   cost: 1, impact: 3, moneyAngle: 'save' },
  { id: 'upgrade-appliances',       title: 'Upgrade to 5–6 star appliances',                    theme: 'energy', actionType: 'personal',   cost: 3, impact: 3, moneyAngle: 'invest' },
  { id: 'induction-cooking',        title: 'Get induction cooking',                              theme: 'energy', actionType: 'personal',   cost: 3, impact: 2, moneyAngle: 'invest' },
  { id: 'heat-pump-hot-water',      title: 'Get a hot water heat pump',                          theme: 'energy', actionType: 'personal',   cost: 3, impact: 3, moneyAngle: 'invest' },
  { id: 'insulate-floor',           title: 'Insulate the floor',                                 theme: 'energy', actionType: 'personal',   cost: 3, impact: 3, moneyAngle: 'invest' },
  { id: 'insulate-roof',            title: 'Insulate the roof',                                  theme: 'energy', actionType: 'personal',   cost: 3, impact: 4, moneyAngle: 'invest' },
  { id: 'electric-heating',         title: 'Get electric heating and cooling',                   theme: 'energy', actionType: 'personal',   cost: 4, impact: 4, moneyAngle: 'invest' },
  { id: 'double-glaze',             title: 'Double glaze the windows',                           theme: 'energy', actionType: 'personal',   cost: 4, impact: 3, moneyAngle: 'invest' },
  { id: 'insulate-walls',           title: 'Insulate the walls',                                 theme: 'energy', actionType: 'personal',   cost: 4, impact: 4, moneyAngle: 'invest' },
  { id: 'install-solar',            title: 'Get Solar PV',                                       theme: 'energy', actionType: 'personal',   cost: 4, impact: 5, moneyAngle: 'invest' },
  { id: 'get-a-battery',            title: 'Get a battery',                                      theme: 'energy', actionType: 'personal',   cost: 5, impact: 4, moneyAngle: 'invest' },
  { id: 'fully-electrify',          title: 'Renovate the house: insulate, face north, electrify, solar, battery', theme: 'energy', actionType: 'personal', cost: 5, impact: 5, moneyAngle: 'invest' },
  { id: 'conversations-energy',     title: 'Teach and learn — have change conversations',        theme: 'energy', actionType: 'personal',   cost: 1, impact: 3 },

  // Community
  { id: 'electrify-together',       title: 'Find a friend and share the process of electrifying your homes together', theme: 'energy', actionType: 'community', cost: 1, impact: 3 },
  { id: 'celebrate-grieve',         title: 'Celebrate the wins and grieve the losses together', theme: 'energy', actionType: 'community',  cost: 1, impact: 2 },
  { id: 'invite-over-efficient',    title: 'Invite people over in the cold or heat if you have an efficient home — especially older neighbours', theme: 'energy', actionType: 'community', cost: 1, impact: 2 },
  { id: 'energy-conversations',     title: 'Have conversations with friends and neighbours about what you\'re doing', theme: 'energy', actionType: 'community', cost: 1, impact: 3 },
  { id: 'invest-community-solar',   title: 'Invest in a community solar farm',                  theme: 'energy', actionType: 'community',  cost: 3, impact: 4, moneyAngle: 'invest' },
  { id: 'join-community-energy',    title: 'Join a community energy project',                   theme: 'energy', actionType: 'community',  cost: 1, impact: 3 },
  { id: 'share-energy-journey',     title: 'Share your energy journey with the neighbours',     theme: 'energy', actionType: 'community',  cost: 1, impact: 2 },
  { id: 'intergenerational-housing',title: 'Consider intergenerational housing — less impact and more pot luck dinners', theme: 'energy', actionType: 'community', cost: 2, impact: 4 },
  { id: 'donate-community-solar',   title: 'Donate to local community solar projects',          theme: 'energy', actionType: 'community',  cost: 2, impact: 3, moneyAngle: 'invest' },
  { id: 'set-up-energy-coop',       title: 'Set up an energy cooperative',                      theme: 'energy', actionType: 'community',  cost: 2, impact: 5 },
  { id: 'energy-retrofit-enterprise',title: 'Set up an enterprise delivering energy retrofits for low income homes', theme: 'energy', actionType: 'community', cost: 2, impact: 5 },

  // Political
  { id: 'support-low-income-electrify', title: 'Support policies to help low-income households electrify their homes', theme: 'energy', actionType: 'political', cost: 1, impact: 5 },
  { id: 'advocate-energy-ratings',  title: 'Advocate for mandatory energy ratings on all homes sold or rented', theme: 'energy', actionType: 'political', cost: 1, impact: 5 },
  { id: 'call-100-renewable',       title: 'Call for 100% renewable energy targets in your council', theme: 'energy', actionType: 'political', cost: 1, impact: 5 },
  { id: 'push-community-energy',    title: 'Push for community-owned renewable energy projects', theme: 'energy', actionType: 'political', cost: 1, impact: 4 },


  // ─── STUFF ─────────────────────────────────────────────────────────────────

  // Personal
  { id: 'try-not-buying',           title: 'Try not buying something',                           theme: 'stuff', actionType: 'personal',   cost: 1, impact: 1, moneyAngle: 'save' },
  { id: 'try-fixing',               title: 'Try fixing something (yourself or at a Repair Cafe)', theme: 'stuff', actionType: 'personal',  cost: 1, impact: 2, moneyAngle: 'save' },
  { id: 'try-eco-alternative',      title: 'Try buying an environmentally made alternative',     theme: 'stuff', actionType: 'personal',   cost: 1, impact: 2 },
  { id: 'minimise-packaging',       title: 'Minimise packaging on a grocery trip',               theme: 'stuff', actionType: 'personal',   cost: 1, impact: 2, moneyAngle: 'save' },
  { id: 'borrow-toy-library',       title: 'Borrow from a Toy Library instead of buying new toys', theme: 'stuff', actionType: 'personal', cost: 1, impact: 2, moneyAngle: 'save' },
  { id: 'buy-secondhand',           title: 'Buy secondhand before buying new',                   theme: 'stuff', actionType: 'personal',   cost: 1, impact: 3, moneyAngle: 'save' },
  { id: 'swap-rent-clothes',        title: 'Swap or rent clothes instead of buying new',         theme: 'stuff', actionType: 'personal',   cost: 1, impact: 3, moneyAngle: 'save' },
  { id: 'empty-landfill-bin',       title: 'Set a goal for a nearly empty landfill bin',         theme: 'stuff', actionType: 'personal',   cost: 1, impact: 3, moneyAngle: 'save' },
  { id: 'buy-less-challenge',       title: 'Take the 6-month buy less stuff challenge',          theme: 'stuff', actionType: 'personal',   cost: 1, impact: 3, moneyAngle: 'save' },

  // Community
  { id: 'share-tools-neighbours',   title: 'Share mowers, tools, sporting equipment and camping stuff with neighbours', theme: 'stuff', actionType: 'community', cost: 1, impact: 3 },
  { id: 'freecycle-buy-nothing',    title: 'Join online Freecycle or Buy Nothing groups',        theme: 'stuff', actionType: 'community',  cost: 1, impact: 2 },
  { id: 'library-of-things',        title: 'Donate to, support or set up a community library of things', theme: 'stuff', actionType: 'community', cost: 1, impact: 3 },
  { id: 'tool-library',             title: 'Donate to, support or set up a tool library',       theme: 'stuff', actionType: 'community',  cost: 1, impact: 3 },
  { id: 'food-share',               title: 'Donate to, support or set up a food share',         theme: 'stuff', actionType: 'community',  cost: 1, impact: 3 },
  { id: 'bike-fixing-group',        title: 'Donate to, support or set up a bike fixing group',  theme: 'stuff', actionType: 'community',  cost: 1, impact: 3 },
  { id: 'clothes-swap',             title: 'Donate to, support or set up a clothes swap',       theme: 'stuff', actionType: 'community',  cost: 1, impact: 2 },
  { id: 'dress-rental',             title: 'Donate to, support or set up a dress rental shop',  theme: 'stuff', actionType: 'community',  cost: 2, impact: 3 },

  // Political
  { id: 'right-to-repair',          title: 'Support right-to-repair legislation',               theme: 'stuff', actionType: 'political',  cost: 1, impact: 5 },
  { id: 'producer-responsibility',  title: 'Advocate for extended producer responsibility laws', theme: 'stuff', actionType: 'political',  cost: 1, impact: 5 },
  { id: 'ban-single-use-plastics',  title: 'Support bans on unnecessary single-use plastics and packaging', theme: 'stuff', actionType: 'political', cost: 1, impact: 4 },
  { id: 'push-circular-economy',    title: 'Push for a circular economy plan in your local council', theme: 'stuff', actionType: 'political', cost: 1, impact: 4 },


  // ─── NATURE ────────────────────────────────────────────────────────────────

  // Personal
  { id: 'bush-walk',                title: 'Go for a local bush walk',                           theme: 'nature', actionType: 'personal',  cost: 1, impact: 1 },
  { id: 'keep-bird-list',           title: 'Keep a bird sighting list',                          theme: 'nature', actionType: 'personal',  cost: 1, impact: 1 },
  { id: 'buy-nature-guides',        title: 'Buy local bird, plant, insect and reptile guides',   theme: 'nature', actionType: 'personal',  cost: 1, impact: 1 },
  { id: 'nature-sitting-spot',      title: 'Create a nature sitting spot in your garden',        theme: 'nature', actionType: 'personal',  cost: 1, impact: 3 },
  { id: 'leave-mess-insects',       title: 'Leave logs and stones in garden for insect and reptile habitat', theme: 'nature', actionType: 'personal', cost: 1, impact: 3 },
  { id: 'bush-walks-often',         title: 'Go for regular bush walks',                          theme: 'nature', actionType: 'personal',  cost: 1, impact: 3 },
  { id: 'hike-nature',              title: 'Hike in nature often',                               theme: 'nature', actionType: 'personal',  cost: 3, impact: 2 },
  { id: 'plant-summer-shade',       title: 'Plant for summer shade and winter sun',              theme: 'nature', actionType: 'personal',  cost: 1, impact: 2 },
  { id: 'slow-stormwater',          title: 'Slow and retain stormwater',                         theme: 'nature', actionType: 'personal',  cost: 3, impact: 3 },
  { id: 'bird-boxes',               title: 'Install bird boxes',                                 theme: 'nature', actionType: 'personal',  cost: 1, impact: 3 },
  { id: 'plant-pollinators',        title: 'Plant for local pollinators',                        theme: 'nature', actionType: 'personal',  cost: 1, impact: 2 },
  { id: 'plant-native-tree',        title: 'Plant a native tree, shrub and grass',               theme: 'nature', actionType: 'personal',  cost: 1, impact: 2 },
  { id: 'nature-strip-natives',     title: 'Plant the nature strip with natives',                theme: 'nature', actionType: 'personal',  cost: 1, impact: 3 },
  { id: 'responsible-pet-owner',    title: 'Be a responsible pet owner',                         theme: 'nature', actionType: 'personal',  cost: 1, impact: 3 },
  { id: 'collect-rainwater',        title: 'Collect and use your own rainwater',                 theme: 'nature', actionType: 'personal',  cost: 3, impact: 3 },
  { id: 'frog-pond',                title: 'Build a frog pond',                                  theme: 'nature', actionType: 'personal',  cost: 3, impact: 3 },
  { id: 'small-native-garden',      title: 'Create a small native garden',                       theme: 'nature', actionType: 'personal',  cost: 2, impact: 3 },
  { id: 'donate-conservation',      title: 'Donate money to local conservation projects',        theme: 'nature', actionType: 'personal',  cost: 3, impact: 4 },
  { id: 'do-all-other-actions',     title: 'Do all the energy, transport and stuff actions',     theme: 'nature', actionType: 'personal',  cost: 3, impact: 5 },
  { id: 'indigenous-garden',        title: 'Create an indigenous garden',                        theme: 'nature', actionType: 'personal',  cost: 2, impact: 4 },
  { id: 'nature-covenant',          title: 'Put a nature covenant on your land',                 theme: 'nature', actionType: 'personal',  cost: 3, impact: 5 },
  { id: 'restore-degraded-land',    title: 'Buy a block of degraded land and restore it',        theme: 'nature', actionType: 'personal',  cost: 5, impact: 5 },
  { id: 'conversations-nature',     title: 'Teach and learn — have change conversations',        theme: 'nature', actionType: 'personal',  cost: 1, impact: 3 },

  // Community
  { id: 'citizen-science',          title: 'Participate in citizen science events like bird count surveys', theme: 'nature', actionType: 'community', cost: 1, impact: 3 },
  { id: 'neighbours-nature-strips', title: 'Join with your neighbours to plant your nature strips with native plants', theme: 'nature', actionType: 'community', cost: 1, impact: 3 },
  { id: 'share-seeds-cuttings',     title: 'Share seeds, cuttings, fruit, veggies and herbs with the neighbours', theme: 'nature', actionType: 'community', cost: 1, impact: 2 },
  { id: 'nature-talks-walks',       title: 'Join local guided nature talks and walks',           theme: 'nature', actionType: 'community',  cost: 1, impact: 2 },
  { id: 'support-revegetation',     title: 'Support a local revegetation or reforestation project', theme: 'nature', actionType: 'community', cost: 2, impact: 4 },
  { id: 'restore-local-park',       title: 'Set up a community action group to restore your local park, path or waterway', theme: 'nature', actionType: 'community', cost: 1, impact: 4 },
  { id: 'care-local-reserve',       title: 'Care for your local reserve',                        theme: 'nature', actionType: 'community',  cost: 1, impact: 3 },
  { id: 'deep-ecology-workshop',    title: 'Participate in a Deep Ecology workshop',             theme: 'nature', actionType: 'community',  cost: 1, impact: 3 },

  // Political
  { id: 'stronger-nature-laws',     title: 'Campaign for stronger nature protection laws',       theme: 'nature', actionType: 'political',  cost: 1, impact: 5 },
  { id: 'advocate-green-space',     title: 'Advocate for more local green space and habitat corridors', theme: 'nature', actionType: 'political', cost: 1, impact: 4 },
  { id: 'join-environment-group',   title: 'Join a local environment or climate group',          theme: 'nature', actionType: 'political',  cost: 1, impact: 4 },
  { id: 'attend-council-nature',    title: 'Attend a council meeting on local sustainability and nature', theme: 'nature', actionType: 'political', cost: 1, impact: 3 },


  // ─── FOOD ──────────────────────────────────────────────────────────────────

  // Personal
  { id: 'less-red-meat-try',        title: 'Try buying less red meat',                           theme: 'food', actionType: 'personal',    cost: 1, impact: 1, moneyAngle: 'save' },
  { id: 'buy-what-you-need',        title: 'Buy the food you need',                              theme: 'food', actionType: 'personal',    cost: 1, impact: 3, moneyAngle: 'save' },
  { id: 'eat-leftovers',            title: 'Eat leftovers',                                      theme: 'food', actionType: 'personal',    cost: 1, impact: 3, moneyAngle: 'save' },
  { id: 'grow-own-herbs',           title: 'Grow your own herbs',                                theme: 'food', actionType: 'personal',    cost: 1, impact: 2, moneyAngle: 'save' },
  { id: 'buy-seasonal',             title: 'Buy seasonal food',                                  theme: 'food', actionType: 'personal',    cost: 1, impact: 3, moneyAngle: 'save' },
  { id: 'eat-less-red-meat',        title: 'Eat less red meat',                                  theme: 'food', actionType: 'personal',    cost: 1, impact: 3, moneyAngle: 'save' },
  { id: 'eat-less-dairy',           title: 'Eat less dairy',                                     theme: 'food', actionType: 'personal',    cost: 1, impact: 3, moneyAngle: 'save' },
  { id: 'eat-less-meat',            title: 'Eat less meat',                                      theme: 'food', actionType: 'personal',    cost: 1, impact: 2, moneyAngle: 'save' },
  { id: 'grow-own-veggies',         title: 'Grow your own veggies',                              theme: 'food', actionType: 'personal',    cost: 2, impact: 3, moneyAngle: 'save' },
  { id: 'wicking-bed',              title: 'Build your own wicking veggie bed',                  theme: 'food', actionType: 'personal',    cost: 3, impact: 3 },
  { id: 'buy-local-organic',        title: 'Buy local, organic and regenerative food',           theme: 'food', actionType: 'personal',    cost: 2, impact: 4 },
  { id: 'fruit-trees',              title: 'Plant and manage your own fruit trees',              theme: 'food', actionType: 'personal',    cost: 3, impact: 3 },
  { id: 'chook-shed',               title: 'Build your own chook shed',                          theme: 'food', actionType: 'personal',    cost: 3, impact: 2 },
  { id: 'become-vegetarian',        title: 'Become vegetarian',                                  theme: 'food', actionType: 'personal',    cost: 1, impact: 4 },
  { id: 'become-vegan',             title: 'Become vegan',                                       theme: 'food', actionType: 'personal',    cost: 1, impact: 5 },
  { id: 'conversations-food',       title: 'Teach and learn — have change conversations',        theme: 'food', actionType: 'personal',    cost: 1, impact: 3 },

  // Community
  { id: 'cook-share-food',          title: 'Cook and share food with neighbours and family',     theme: 'food', actionType: 'community',   cost: 1, impact: 2 },
  { id: 'neighbours-fruit-trees',   title: 'Join with your neighbours to plant and share different fruit trees', theme: 'food', actionType: 'community', cost: 1, impact: 3 },
  { id: 'distribute-veggie-boxes',  title: 'Join with neighbours to pick up and distribute locally grown veggie boxes', theme: 'food', actionType: 'community', cost: 1, impact: 3 },
  { id: 'grow-food-urban',          title: 'Set up an enterprise to grow food in public urban places', theme: 'food', actionType: 'community', cost: 2, impact: 4 },
  { id: 'food-swapping-groups',     title: 'Donate to, support or set up food swapping groups', theme: 'food', actionType: 'community',   cost: 1, impact: 3 },
  { id: 'community-growers-market', title: 'Donate to, support or set up community growers markets', theme: 'food', actionType: 'community', cost: 1, impact: 3 },
  { id: 'farmers-markets',          title: 'Donate to, support or set up farmers markets',      theme: 'food', actionType: 'community',   cost: 1, impact: 3 },
  { id: 'community-gardens',        title: 'Donate to, support or set up community gardens',    theme: 'food', actionType: 'community',   cost: 1, impact: 3 },
  { id: 'food-relief',              title: 'Donate to, support or set up food relief organisations', theme: 'food', actionType: 'community', cost: 2, impact: 4 },
  { id: 'food-pantries',            title: 'Donate to, support or set up local food pantries',  theme: 'food', actionType: 'community',   cost: 1, impact: 3 },
  { id: 'local-food-brands',        title: 'Support local and regional food brands',             theme: 'food', actionType: 'community',   cost: 1, impact: 2 },

  // Political
  { id: 'food-sovereignty-policy',  title: 'Support local food sovereignty and sustainable farming policy', theme: 'food', actionType: 'political', cost: 1, impact: 5 },
  { id: 'food-labelling',           title: 'Advocate for food labelling showing environmental impact', theme: 'food', actionType: 'political', cost: 1, impact: 4 },
  { id: 'fund-community-food',      title: 'Support funding for community food growing and food relief', theme: 'food', actionType: 'political', cost: 1, impact: 4 },


  // ─── MONEY ─────────────────────────────────────────────────────────────────

  // Personal
  { id: 'try-shorter-showers',      title: 'Try shorter showers',                                theme: 'money', actionType: 'personal',   cost: 1, impact: 1, moneyAngle: 'save' },
  { id: 'try-less-power-money',     title: 'Try using less power',                               theme: 'money', actionType: 'personal',   cost: 1, impact: 1, moneyAngle: 'save' },
  { id: 'try-less-meat-money',      title: 'Try buying less meat',                               theme: 'money', actionType: 'personal',   cost: 1, impact: 1, moneyAngle: 'save' },
  { id: 'drive-less-money',         title: 'Drive less',                                         theme: 'money', actionType: 'personal',   cost: 1, impact: 3, moneyAngle: 'save' },
  { id: 'use-less-power',           title: 'Use less power',                                     theme: 'money', actionType: 'personal',   cost: 1, impact: 3, moneyAngle: 'save' },
  { id: 'waste-less-food',          title: 'Waste less food',                                    theme: 'money', actionType: 'personal',   cost: 1, impact: 3, moneyAngle: 'save' },
  { id: 'buy-less-red-meat',        title: 'Buy less red meat',                                  theme: 'money', actionType: 'personal',   cost: 1, impact: 3, moneyAngle: 'save' },
  { id: 'buy-less-stuff',           title: 'Buy less stuff',                                     theme: 'money', actionType: 'personal',   cost: 1, impact: 3, moneyAngle: 'save' },
  { id: 'conversations-money',      title: 'Teach and learn — have change conversations',        theme: 'money', actionType: 'personal',   cost: 1, impact: 3 },
  { id: 'switch-super',             title: 'Switch super fund to zero fossil fuels',             theme: 'money', actionType: 'personal',   cost: 1, impact: 5, moneyAngle: 'save' },
  { id: 'shift-shares',             title: 'Shift shares out of fossil fuels',                   theme: 'money', actionType: 'personal',   cost: 1, impact: 5, moneyAngle: 'save' },
  { id: 'switch-banks',             title: 'Shift banks to one that doesn\'t invest in fossil fuels', theme: 'money', actionType: 'personal', cost: 1, impact: 4, moneyAngle: 'save' },
  { id: 'donate-local-projects',    title: 'Donate to local community people, projects and places', theme: 'money', actionType: 'personal', cost: 2, impact: 4, moneyAngle: 'invest' },
  { id: 'invest-community-energy',  title: 'Invest in community renewable energy projects',      theme: 'money', actionType: 'personal',   cost: 3, impact: 4, moneyAngle: 'invest' },
  { id: 'invest-solar',             title: 'Invest in Solar PV',                                 theme: 'money', actionType: 'personal',   cost: 4, impact: 4, moneyAngle: 'invest' },
  { id: 'electrify-house',          title: 'Invest in an electric home',                         theme: 'money', actionType: 'personal',   cost: 4, impact: 5, moneyAngle: 'invest' },
  { id: 'invest-ev',                title: 'Invest in an EV',                                    theme: 'money', actionType: 'personal',   cost: 5, impact: 5, moneyAngle: 'invest' },
  { id: 'invest-home-reno',         title: 'Invest in an efficient, electric, solar powered home renovation', theme: 'money', actionType: 'personal', cost: 5, impact: 5, moneyAngle: 'invest' },

  // Community
  { id: 'parents-school-bushland',  title: 'Get together with parents at your kids\' school and donate to plant a bushland', theme: 'money', actionType: 'community', cost: 2, impact: 3 },
  { id: 'donate-local-community',   title: 'Get together with friends and donate to your local community pantry, tool library or sustainability group', theme: 'money', actionType: 'community', cost: 2, impact: 3 },
  { id: 'encourage-super-banks',    title: 'Encourage friends and family to switch super funds and banks', theme: 'money', actionType: 'community', cost: 1, impact: 4 },
  { id: 'share-savings-online',     title: 'Share your spending savings online',                 theme: 'money', actionType: 'community',  cost: 1, impact: 2 },
  { id: 'collective-solar-farm',    title: 'Get together with friends and invest in a community owned solar farm', theme: 'money', actionType: 'community', cost: 3, impact: 5, moneyAngle: 'invest' },
  { id: 'collective-car-sharing',   title: 'Get together with friends and invest in a car sharing cooperative', theme: 'money', actionType: 'community', cost: 3, impact: 4, moneyAngle: 'invest' },
  { id: 'collective-clothing-hire', title: 'Get together with friends and invest in a clothing hire store', theme: 'money', actionType: 'community', cost: 3, impact: 3, moneyAngle: 'invest' },
  { id: 'community-currency',       title: 'Get together with friends and invest in a community currency project', theme: 'money', actionType: 'community', cost: 3, impact: 3, moneyAngle: 'invest' },

  // Political
  { id: 'write-mp-climate',         title: 'Write to your MP about climate action',              theme: 'money', actionType: 'political',  cost: 1, impact: 5 },
  { id: 'vote-climate',             title: 'Vote for candidates with strong climate policies',   theme: 'money', actionType: 'political',  cost: 1, impact: 5 },
  { id: 'push-workplace-sustain',   title: 'Push for sustainability at your workplace',          theme: 'money', actionType: 'political',  cost: 1, impact: 4 },
  { id: 'support-divestment',       title: 'Support fossil fuel divestment campaigns',           theme: 'money', actionType: 'political',  cost: 1, impact: 5 },

];
// Total: 190 actions
// Personal:  20 transport + 22 energy + 9 stuff + 23 nature + 16 food + 18 money = 108
// Community: 14 transport + 11 energy + 8 stuff + 8 nature + 11 food + 8 money  = 60
// Political:  4 transport +  4 energy + 4 stuff + 4 nature +  3 food + 4 money  = 23
