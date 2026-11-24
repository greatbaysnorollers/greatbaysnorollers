// =====================================================================
// CLUB UPDATES AND COMING UP EVENTS: the one place to edit them.
//
// The homepage shows the 3 newest posts, club-updates.html shows them all,
// and events.html shows the Coming Up cards. updates.js draws them; don't
// edit that file to add content.
//
// ADD A POST: copy one { ... }, block in CLUB_POSTS, paste it at the top,
// and change it. Newest date shows first, so the order in this file doesn't
// strictly matter.
//   id         Anchor for links, e.g. club-updates#workdayNov21. Optional, but
//              never change one that emails or Facebook posts already link to.
//   date       'YYYY-MM-DD'. Shown as "November 21, 2026" and used for order.
//   club       'GBSR', 'LST' or 'Both'.
//   title      Card heading.
//   text       The post itself, in HTML between the backticks: <p>...</p> for
//              paragraphs, <ul><li>...</li></ul> for lists. Don't type a
//              backtick ` inside it. Sign off with both club names.
//   collapse   true = long post: show the start with a "Read More" button.
//   photoFolder + photos
//              Folder under 3-MEDIA/1-Photos/ and a list of
//              ['file-name.jpg', 'What the photo shows']. Each photo needs a
//              700px copy with the same name in that folder's thumbs/.
//   homeText, homePhotos
//              Optional shorter version for the homepage: other text, and a
//              number (first N photos) or a list of file names.
//
// ADD A COMING UP CARD: copy a block in CLUB_EVENTS. The card hides itself
// after its date (or after 'until' for a multi-day event), and the section
// hides when nothing is left.
//   date       'YYYY-MM-DD'. Drives the date badge and the hiding.
//   club       'GBSR', 'LST' or 'Both'; shown after the title.
//   when       Day, time and place, as one line.
//   text       Short description (HTML).
//   post       Optional id of a post above: adds a "Read more" link to it.
//   link       Optional ['https://...', 'Button text'], e.g. the Facebook RSVP.
//
// House rules: no landowner or property names, no emoji bullets, sign with
// "Great Bay Sno-Rollers & Lee Sno-Travelers", never a person.
// =====================================================================

window.CLUB_EVENTS = [
    {
        id: 'meetingDec7',
        date: '2026-12-07',
        club: 'Both',
        title: 'December Club Meeting',
        when: 'Monday, December 7 &middot; 6:00 PM &middot; Billy&rsquo;s shop, 31 Tuckers Way, Newmarket',
        text: `Trail-naming night: we&rsquo;ll go through everyone&rsquo;s suggestions on a big screen with the
               interactive map and settle on names.
               <a href="https://docs.google.com/spreadsheets/d/1SGmMfgPYqCgOK_gtZ_HX9HYHLcbq4DgdCuo7uyFnkHg/edit?usp=sharing" target="_blank" rel="noopener">Add your trail name ideas</a>
               before the meeting. Also on the list: the Lee bridge, getting trails and groomers
               ready for the season, and ideas for the Newmarket 300 parade float. Everyone is welcome; bring a
               camp chair. The full agenda will be posted here closer to the date.`,
        link: ['https://www.facebook.com/events/957589860556155/', 'RSVP on Facebook']
    },
    {
        date: '2026-11-28',
        club: 'Both',
        title: 'Final Lee Bridge Work Day',
        when: 'Saturday, November 28 &middot; 8:00 AM &middot; 51 Tuttle Road, Lee',
        text: `Ramps on each end and some welded cross bracing, and the new bridge over the Little River is done.
               Same parking as last time: 51 Tuttle Road, just north of the bridge.`,
        post: 'workdayNov28',
        link: ['https://www.google.com/calendar/event?eid=dnAzNThjajg4MnNoczllOWZ1YXFrbnFvNHMgZ3JlYXRiYXlzbm9yb2xsZXJzQG0', 'Add it to your calendar']
    },
    {
        date: '2026-11-21',
        club: 'Both',
        title: 'Lee Bridge Decking Work Day',
        when: 'Saturday, November 21 &middot; 8:00 AM &middot; 51 Tuttle Road, Lee',
        text: `The new bridge over the Little River near Tuttle Road is ready for its wood decking.
               Park at 51 Tuttle Road, just north of the bridge, and bring an impact driver or skill saw if you have one.`,
        post: 'workdayNov21',
        link: ['https://www.facebook.com/events/1889427749135666/', 'RSVP on Facebook']
    }
];

window.CLUB_POSTS = [
    {
        id: 'workdayNov28',
        date: '2026-11-24',
        club: 'Both',
        title: 'Final Lee Bridge Work Day &mdash; Saturday, November 28',
        text: `
            <p>One more Saturday and the new bridge over the Little River near Tuttle Road is done. On
               <strong>Saturday, November 28</strong> we&rsquo;re adding the ramps at each end and welding
               some cross bracing. Members of both clubs and anyone who wants to help are welcome.</p>
            <p><strong>We meet at 8:00 AM.</strong> Same parking as last time: 51 Tuttle Road, Lee, just
               north of the bridge.</p>
            <p><strong>Bring</strong> a battery-powered impact driver or skill saw if you have one,
               and any PPE you need (gloves, safety glasses and so on).</p>
            <p><a href="https://www.google.com/calendar/event?eid=dnAzNThjajg4MnNoczllOWZ1YXFrbnFvNHMgZ3JlYXRiYXlzbm9yb2xsZXJzQG0" target="_blank" rel="noopener">Add it to your calendar</a>.
               <a href="club-updates.html#bridgeDeckedNov21">See how decking day went</a>.</p>
            <p><strong>Ride safe,</strong><br>Great Bay Sno-Rollers &amp; Lee Sno-Travelers</p>`
    },
    {
        id: 'bridgeDeckedNov21',
        date: '2026-11-21',
        club: 'Both',
        title: 'The Lee Bridge Is Decked',
        text: `
            <p>The new bridge over the Little River near Tuttle Road has its deck. On Saturday,
               November 21, about ten members of the Great Bay Sno-Rollers and the Lee Sno-Travelers
               laid and fastened the wood decking across the new steel beams, and the whole deck was
               down by the end of the day.</p>
            <p><strong>What&rsquo;s left:</strong> ramps at each end, so sleds can get on and off the
               deck. Once the ramps are on, the bridge is ready for sleds.</p>
            <p>A quick look back: the old bridge came out on October 17, and the new steel beams went in
               this month. Thank you to everyone who gave up a Saturday.</p>
            <p>The project is funded by the NH Summer Grant-in-Aid program.
               <a href="club-updates.html#bridgeOct17">See how it started</a>.</p>
            <p>Want to hear about the next work day? <a href="get-involved.html">Sign up for club emails</a>
               or <a href="events.html#subscribe">subscribe to the club calendar</a>.</p>
            <p><strong>Ride safe,</strong><br>Great Bay Sno-Rollers &amp; Lee Sno-Travelers</p>`,
        homeText: `
            <p>About ten members of both clubs decked the new bridge over the Little River near Tuttle
               Road on Saturday, November 21. Only the ramps at each end are left.
               <a href="club-updates.html#bridgeDeckedNov21">Full update and photos &rarr;</a></p>`,
        photoFolder: '2026_Nov21-Lee-Bridge-Decking',
        photos: [
            ['finished-deck.jpg', 'The finished wood deck on the new Lee bridge'],
            ['bare-steel-beams-before.jpg', 'The new steel beams across the river before any decking went on'],
            ['lumber-ready-to-go.jpg', 'Stacks of decking lumber ready to go at the start of the day'],
            ['first-boards-on-the-beams.jpg', 'Members fastening the first boards across the new steel beams'],
            ['crew-decking-from-the-river.jpg', 'Looking up from the river between the steel beams as the crew decks the bridge'],
            ['lumber-stacked-on-the-beams.jpg', 'A member in a Great Bay Sno-Rollers sweatshirt beside lumber stacked on the first section of deck'],
            ['fastening-the-first-section.jpg', 'Members fastening the first section of decking'],
            ['crew-fastening-deck-boards.jpg', 'Members kneeling to fasten deck boards while others look on'],
            ['crew-working-across-the-deck.jpg', 'The crew working across the partly finished deck'],
            ['deck-nearly-done.jpg', 'The deck nearly finished, seen from the trail']
        ],
        homePhotos: ['finished-deck.jpg', 'bare-steel-beams-before.jpg', 'crew-fastening-deck-boards.jpg']
    },
    {
        id: 'workdayNov21',
        date: '2026-11-21',
        club: 'Both',
        title: 'Lee Bridge Decking Work Day &mdash; Saturday, November 21',
        text: `
            <p><strong>Update:</strong> the deck is on.
               <a href="club-updates.html#bridgeDeckedNov21">See the photos</a>.</p>
            <p>The new bridge over the Little River near Tuttle Road is ready for decking. Glenn got the
               steel beams set, and on <strong>Saturday, November 21</strong> we&rsquo;re putting the wood
               decking on. Members of both clubs and anyone who wants to help are welcome; more hands make it go faster.</p>
            <p><strong>We meet at 8:00 AM.</strong> Park at 51 Tuttle Road, Lee, just north of the bridge.</p>
            <p><strong>Bring</strong> a battery-powered impact driver or skill saw if you have one,
               and any PPE you need (gloves, safety glasses and so on).</p>
            <p><a href="https://www.facebook.com/events/1889427749135666/" target="_blank" rel="noopener"><strong>RSVP on Facebook &rarr;</strong></a>
               Facebook will send you a reminder. Or <a href="https://www.google.com/calendar/event?eid=dHUycG5qbmptdWM2djk3YWthcXVtN2xxbWMgZ3JlYXRiYXlzbm9yb2xsZXJzQG0" target="_blank" rel="noopener">add it to your calendar</a>.</p>
            <p>The project is funded by the NH Summer Grant-in-Aid program.
               <a href="club-updates.html#bridgeOct17">See how it started</a>.</p>
            <p><strong>Ride safe,</strong><br>Great Bay Sno-Rollers &amp; Lee Sno-Travelers</p>`
    },
    {
        id: 'arcNov2',
        date: '2026-11-02',
        club: 'Both',
        title: 'November Meeting &mdash; Monday, November 2',
        collapse: true,
        text: `
            <p><strong>Meeting recap</strong></p>
            <p>Thanks to everyone who came out, including a few new faces. The new Lee bridge is
               ready for decking, and the work day is Saturday, November 21.</p>
            <p><strong>Meeting Details:</strong></p>
            <ul>
                <li><strong>Date:</strong> Monday, November 2, 2026</li>
                <li><strong>Time:</strong> 6:00 PM</li>
                <li><strong>Location:</strong> Billy's shop &mdash; 31 Tuckers Way, Newmarket, NH 03857</li>
            </ul>
            <p><strong>Want the full recap?</strong> Agendas and meeting recaps go
               out by email. <a href="get-involved.html">Sign up for club emails</a> to get them.</p>
            <p>Next meeting: <a href="events.html">Monday, December 7</a>.</p>
            <p><strong>Ride safe,</strong><br>Great Bay Sno-Rollers &amp; Lee Sno-Travelers</p>`
    },
    {
        id: 'bridgeOct17',
        date: '2026-10-17',
        club: 'Both',
        title: 'Bridge Project &mdash; The Old Bridge Is Out',
        text: `
            <p><strong>This bridge replacement is funded by the State of New Hampshire's Summer
               Grant-in-Aid program.</strong> The bridge carries the Lee Sno-Travelers trail across the
               Little River near Tuttle Road.</p>
            <p>On Saturday, October 17, members of both clubs turned out and
               tore out the old bridge: the decking came up, the old steel was cut out, and the debris
               was hauled away. The steel beams for the new bridge have also been purchased.</p>
            <p><strong>What's next:</strong> planning the build is on the agenda
               for the <a href="events.html">November 2 meeting</a>. Come weigh in.</p>
            <p>A big thank-you to everyone who came out and helped!</p>`,
        homeText: `
            <p>Our bridge over the Little River near Tuttle Road, funded by the state's Summer
               Grant-in-Aid program, took a big step forward: members of both clubs tore out the old
               bridge, and the steel beams for the new one have been purchased.
               <a href="club-updates.html#bridgeOct17">Full update and photos &rarr;</a></p>`,
        photoFolder: '2026_Oct17-Bridge_Demo',
        photos: [
            ['old-bridge-before.jpg', 'The old wooden bridge over the Little River before demolition'],
            ['old-bridge-deck-before.jpg', 'The worn deck of the old bridge, looking across'],
            ['crew-pulling-decking.jpg', 'Club members pulling up the old decking'],
            ['stripped-to-the-stringers.jpg', 'The bridge stripped down to its stringers over the river'],
            ['cutting-old-steel.jpg', 'Three members cutting up the old steel with grinders'],
            ['hauling-out-debris.jpg', 'A skid steer and dump truck hauling out the old bridge'],
            ['end-of-day-fire.jpg', 'A fire at dusk at the end of the work day']
        ],
        homePhotos: ['old-bridge-before.jpg', 'crew-pulling-decking.jpg', 'cutting-old-steel.jpg']
    },
    {
        id: 'arcOct5',
        date: '2026-10-05',
        club: 'GBSR',
        title: 'October Meeting &mdash; Monday, October 5',
        collapse: true,
        text: `
            <p><strong>Club Meeting</strong></p>
            <p>Thanks to everyone who came out to get ready for the season.</p>
            <p><strong>Meeting Details:</strong></p>
            <ul>
                <li><strong>Date:</strong> Monday, October 5, 2026</li>
                <li><strong>Time:</strong> 6:00 PM</li>
                <li><strong>Location:</strong> Billy's shop &mdash; 31 Tuckers Way, Newmarket, NH 03857</li>
            </ul>
            <p><strong>Want the full recap?</strong> Agendas and meeting recaps go
               out by email. <a href="get-involved.html">Sign up for club emails</a> to get them.</p>
            <p>Next meeting: <a href="events.html">Monday, November 2</a>.</p>
            <p><strong>Ride safe,</strong><br>Great Bay Sno-Rollers &amp; Lee Sno-Travelers</p>`
    },
    {
        id: 'arcSept14',
        date: '2026-09-14',
        club: 'GBSR',
        title: 'September Meeting &mdash; Monday, September 14',
        collapse: true,
        text: `
            <p><strong>Great Bay Sno-Rollers Club Meeting</strong></p>
            <p>First meeting of the season &mdash; come hear what's planned before the snow flies.</p>
            <p><strong>Meeting Details:</strong></p>
            <ul>
                <li><strong>Date:</strong> Monday, September 14, 2026</li>
                <li><strong>Time:</strong> 6:00 PM</li>
                <li><strong>Location:</strong> Billy's shop &mdash; 31 Tuckers Way, Newmarket, NH 03857</li>
            </ul>
            <p>Meetings run the <strong>first Monday of each month</strong>.
               September is the exception &mdash; it falls on the second Monday this year.
               The full season schedule is on the
               <a href="events.html">events page</a>, and you can add every meeting to your
               calendar in one click.</p>
            <p>Feel free to bring any questions or concerns you'd like to
               discuss. Looking forward to seeing everyone there!</p>
            <p><strong>Ride safe,</strong><br>Billy Vandervalk<br>President, Great Bay Sno-Rollers</p>
            <p class="update-ps"><strong>PS -</strong> Bring a camp chair and the shop/meeting is beer-friendly.</p>`
    },
    {
        date: '2026-02-22',
        club: 'GBSR',
        title: 'Bluebird Group Ride - February 22',
        text: `
            <p>About the best February Sunday you could ask for &mdash; blue sky, hard base, and a big turnout. Everything from vintage iron to new sleds lined up on the ice.</p>`,
        photoFolder: '2026_Feb22-Group_Ride',
        photos: [
            ['sled-lineup-bluebird.jpg', 'Sleds lined up on a frozen pond under blue sky'],
            ['group-on-the-corridor.jpg', 'Group of riders stopped along the trail corridor']
        ]
    },
    {
        date: '2026-01-26',
        club: 'GBSR',
        title: 'Storm Day - January 26',
        text: `
            <p>Woke up to the sleds buried. Dug them out, made a day of it, and kept going after dark.</p>`,
        photoFolder: '2026_Jan26-Storm_Ride',
        photos: [
            ['sleds-buried.jpg', 'Snowmobiles buried under fresh snow after an overnight storm'],
            ['group-stop-pond.jpg', 'Riders regrouping on a frozen pond'],
            ['single-file-trail.jpg', 'Riding single file down a freshly covered trail'],
            ['night-ride.jpg', 'Headlight on the trail during a night ride in falling snow']
        ]
    },
    {
        date: '2026-01-19',
        club: 'GBSR',
        title: 'MLK Day Ride - January 19',
        text: `
            <p>Holiday Monday, fresh snow in the trees, and the old Phazers out where they belong. Ran the river and crossed the open fields &mdash; hard to beat a day like this.</p>`,
        photoFolder: '2026_Jan19-MLK_Ride',
        photos: [
            ['riders-on-the-river.jpg', 'Two riders on vintage Yamaha Phazers on a snow-covered river'],
            ['phazers-fresh-snow.jpg', 'Vintage Yamaha Phazers loaded up in fresh snow'],
            ['open-field-crossing.jpg', 'Riders crossing an open snow-covered field']
        ]
    },
    {
        id: 'clubUpdate0',
        date: '2026-01-06',
        club: 'GBSR',
        title: 'January Meeting - January 6th',
        collapse: true,
        text: `
            <p><strong>Great Bay Sno-Rollers January Meeting</strong></p>
            <p>I hope this message finds you well and you had a great New Year! Our monthly January meeting is coming up, and I'd like to invite you all to join us.</p>
            <p><strong>This will be a combined meeting with the members of the Lee Sno-Travelers.</strong></p>
            <p><strong>Meeting Details:</strong></p>
            <ul>
                <li><strong>Date:</strong> Tuesday, January 6th</li>
                <li><strong>Time:</strong> 6:00 PM</li>
                <li><strong>Location:</strong> My shop - 31 Tuckers Way, Newmarket, NH 03857</li>
                <li><strong>The parking area is VERY ICY, please use caution</strong></li>
            </ul>
            <p><strong>Agenda Items:</strong> We have several important topics to discuss as we prepare for the season ahead:</p>
            <ul>
                <li>Trail work updates and upcoming projects</li>
                <li>Signage installation and maintenance</li>
                <li>Club clothing orders and availability</li>
                <li>Grooming schedule and coordination</li>
                <li>Groomer maintenance and equipment status</li>
                <li>Potential expansion: Taking over management of other southern NH clubs</li>
            </ul>
            <p>Feel free to bring any questions or concerns you'd like to discuss. Looking forward to seeing everyone there!</p>
            <p class="update-ps"><strong>PS -</strong> Bring a camp chair and the shop/meeting is beer friendly.</p>`
    },
    {
        date: '2025-12-29',
        club: 'GBSR',
        title: 'Trail Work &amp; Ice Check - December 29',
        text: `
            <p>Was out doing trail work yesterday cleared a bunch of trails between Lee Hook Road and the upper Lamprey River. Cut a hole in the ice on the Lamprey in a few spots, 7-9" everywhere we looked.</p>`,
        photoFolder: '2025_Dec29-Trail_Update',
        photos: [
            ['605127379_867337009177204_1290253696290446714_n.jpg', 'Ice check photo']
        ]
    },
    {
        date: '2025-12-27',
        club: 'GBSR',
        title: 'Trail Smoothing - December 27',
        text: `
            <p>Out smoothing that snow!</p>`,
        photoFolder: '2025_Dec27-Trail_Update',
        photos: [
            ['605193876_866215545956017_1420054460100092599_n.jpg', 'Trail smoothing photo']
        ]
    },
    {
        date: '2025-12-14',
        club: 'GBSR',
        title: 'Full Loop Trail Grooming - December 14',
        text: `
            <p>Your local snowmobile club was out clearing the trails this am.</p>`,
        photoFolder: '2025_Dec14_Update',
        photos: [
            ['597341304_856836413560597_8060508882785267367_n.jpg', 'Trail grooming photo 1'],
            ['597385752_856836466893925_2064940089688574359_n.jpg', 'Trail grooming photo 2'],
            ['597392139_856836536893918_6105219647123673434_n.jpg', 'Trail grooming photo 3'],
            ['597397887_856836603560578_7626117195584514107_n.jpg', 'Trail grooming photo 4'],
            ['597939064_856836420227263_4688380764244533264_n.jpg', 'Trail grooming photo 5']
        ]
    },
    {
        id: 'clubUpdate1',
        date: '2025-12-02',
        club: 'GBSR',
        title: 'December Meeting - December 3rd',
        collapse: true,
        text: `
            <p><strong>Great Bay Sno-Rollers December Meeting</strong></p>
            <p>I hope this message finds you well and ready for another great snowmobiling season! Our monthly December meeting is coming up, and I'd like to invite you all to join us.</p>
            <p><strong>Meeting Details:</strong></p>
            <ul>
                <li><strong>Date:</strong> Wednesday, December 3rd</li>
                <li><strong>Time:</strong> 6:30 PM</li>
                <li><strong>Location:</strong> My shop - 31 Tuckers Way, Newmarket, NH 03857</li>
            </ul>
            <p><strong>Agenda Items:</strong></p>
            <ul>
                <li>Trail work updates and upcoming projects</li>
                <li>Signage installation and maintenance</li>
                <li>Club clothing orders and availability</li>
                <li>Grooming schedule and coordination</li>
                <li>Groomer maintenance and equipment status</li>
            </ul>
            <p>This promises to be an important meeting as we finalize our preparations for the season and discuss some exciting opportunities for our club's growth. Your input and participation are valuable, so please try to attend if you can.</p>
            <p>Feel free to bring any questions or concerns you'd like to discuss. Looking forward to seeing everyone there!</p>
            <p><strong>Ride safe,</strong><br>Billy Vandervalk<br>President, Great Bay Sno-Rollers</p>
            <p class="update-ps"><strong>PS -</strong> Bring a camp chair and the shop/meeting is beer friendly.</p>`
    },
    {
        id: 'clubUpdate2',
        date: '2025-10-29',
        club: 'GBSR',
        title: 'November Meeting - November 8th',
        collapse: true,
        text: `
            <p><strong>UPCOMING MEETING</strong></p>
            <p>I hope this message finds you well and ready for another great snowmobiling season! Our monthly November meeting is coming up, and I'd like to invite you all to join us.</p>
            <p><strong>Meeting Details:</strong></p>
            <ul>
                <li><strong>Date:</strong> Wednesday, November 8th</li>
                <li><strong>Time:</strong> 6:30 PM</li>
                <li><strong>Location:</strong> My shop - 31 Tuckers Way, Newmarket, NH 03857</li>
            </ul>
            <p><strong>Agenda Items:</strong> We have several important topics to discuss as we prepare for the season ahead:</p>
            <ul>
                <li>Trail work updates and upcoming projects</li>
                <li>Signage installation and maintenance</li>
                <li>Club clothing orders and availability</li>
                <li>Grant and Aid opportunities and applications</li>
                <li>Grooming schedule and coordination</li>
                <li>Groomer maintenance and equipment status</li>
                <li>Potential expansion: Taking over the management of other southern NH clubs</li>
            </ul>
            <p>This promises to be an important meeting as we finalize our preparations for the season and discuss some exciting opportunities for our club's growth. Your input and participation are valuable, so please try to attend if you can.</p>
            <p>Feel free to bring any questions or concerns you'd like to discuss. Looking forward to seeing everyone there!</p>`
    }
];
