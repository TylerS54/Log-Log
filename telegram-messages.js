// Telegram messages for poop logging
const telegramMessages = [
    `{name} just dropped a presidential campaign in the porcelain polls.`,
    `{name} just gave the toilet a State of the Feces address.`,
    `{name} just pulled off a number two coup d'état.`,
    `{name} just painted the porcelain like Picasso on a bad day.`,
    `{name} just unleashed a brown revolution in the Oval Office… of the bathroom.`,
    `{name} just turned the toilet bowl into a war zone, and it surrendered.`,
    `{name} just donated a mudslide to the city's waste management department.`,
    `{name} just made the sewer rats reconsider their life choices.`,
    `{name} just performed a one-man show of "Phantom of the Crapera."`,
    `{name} just lost a close election to the toilet's flushing mechanism.`,
    `{name} just committed an act so foul, even the skunks are offended.`,
    `{name} just expressed their darkest secrets… in the form of excrement.`,
    `{name} just unleashed more destruction than a failed nuclear test.`,
    `{name} just staged a coup in their colon, and the rebels won.`,
    `{name} just re-enacted the Black Plague… with their bowels.`,
    `{name} just wrote a resignation letter in stench form.`,
    `{name} just tested the plumbing's loyalty to the nation.`,
    `{name} just dropped something that made the toilet question its career path.`,
    `{name} just gave the Grim Reaper a run for his money—brown was definitely the color of doom.`,
    `{name} just did a brown exorcism, and the demons are still screaming.`,
    `{name} just made the entire plumbing system file for early retirement.`,
    `{name} just turned the restroom into a crime scene—call the FBI.`,
    `{name} just took "going with the flow" to catastrophic levels.`,
    `{name} just raised the bathroom's terror alert to code brown.`,
    `{name} just unleashed more hot air than a political press conference.`,
    `{name} just gave new meaning to "running for office"—straight to the toilet.`,
    `{name} just brought tears to the eyes of innocent bystanders… from two rooms away.`,
    `{name} just launched a new wave of biological warfare in their own home.`,
    `{name} just tried to flush out all the world's problems—starting with that burrito.`,
    `{name} just held a summit with Taco Tuesday, and the negotiations broke down violently.`,
    `{name} just provided enough fertilizer to feed the entire county's crops.`,
    `{name} just discovered a new species in the toilet, and it's not friendly.`,
    `{name} just turned the restroom into a three-act tragedy, starring their colon.`,
    `{name} just outperformed any horror movie special effects team.`,
    `{name} just introduced the toilet to the concept of eternal suffering.`,
    `{name} just gifted the sewage plant a brand-new reason to unionize.`,
    `{name} just unleashed an unholy ritual that would scare the devil himself.`,
    `{name} just made the plumber's phone ring off the hook—emergency meeting required.`,
    `{name} just made a deposit so large, the bank called to verify the transaction.`,
    `{name} just triggered a motion alarm in the sewer system—nobody is safe.`,
    `{name} just initiated the darkest timeline for the sanitation department.`,
    `{name} just left a memorial service in the toilet bowl—for that burrito's short life.`,
    `{name} just taught the pipe system new swear words in every language.`,
    `{name} just discovered the backside of democracy… and it's not looking good.`,
    `{name} just performed a power move so toxic, the EPA has been alerted.`,
    `{name} just experienced a meltdown more catastrophic than any stock market crash.`,
    `{name} just redefined the meaning of 'explosive personality.'`,
    `{name} just forced the CDC to issue new guidelines on personal bathroom usage.`,
    `{name} just made the toilet wish it had a witness protection program.`,
    `{name} just wrote a very dark chapter in the history of bodily functions.`,
    `{name} just ran a covert operation and left no survivors—except the plunger.`,
    `{name} just broke the Geneva Conventions with that biological assault.`,
    `{name} just left the seat looking like a Jackson Pollock tribute gone wrong.`,
    `{name} just turned the toilet water into a swirling vortex of regret.`,
    `{name} just flushed away more dignity than any politician's scandal.`,
    `{name} just held a funeral for last night's dinner—no open casket allowed.`,
    `{name} just made the phrase "shock and awe" sound like child's play.`,
    `{name} just unleashed the next pandemic—patient zero is the poor toilet.`,
    `{name} just summoned Cthulhu with their bowel incantation.`,
    `{name} just ran out of diplomatic immunity for that atrocity.`,
    `{name} just caused every candle in the house to wave a white flag.`,
    `{name} just created a stink so potent, it's now on a terrorist watch list.`,
    `{name} just tested the durability of porcelain under extreme pressure.`,
    `{name} just initiated a worldwide shortage of air freshener.`,
    `{name} just made the plumber double his rates—hazard pay, indeed.`,
    `{name} just turned the restroom into the darkest circle of Dante's Inferno.`,
    `{name} just turned Taco Tuesday into a war crime Wednesday.`,
    `{name} just made the water company send an apology letter to the neighbor's pipes.`,
    `{name} just stepped down from their own personal throne—still not impeached, though.`,
    `{name} just hosted a private showing of "When Burritos Strike Back."`,
    `{name} just made the toilet ask for asylum in another country.`,
    `{name} just orchestrated a mass evacuation—of their own bowels.`,
    `{name} just taught the entire neighborhood the meaning of 'silent but deadly.'`,
    `{name} just wrote a love letter to the toilet, sealed with a stench.`,
    `{name} just re-enacted the apocalypse in the privacy of a four-walled chamber.`,
    `{name} just gave the exhaust fan PTSD—it may never spin again.`,
    `{name} just produced more substance than a politician's entire manifesto.`,
    `{name} just forced the bathroom scale to file a missing persons report.`,
    `{name} just gave the plunger a nervous breakdown—therapy recommended.`,
    `{name} just rewrote the dictionary under the word 'evacuation.'`,
    `{name} just redrew the map of the toilet bowl with extreme prejudice.`,
    `{name} just took the scenic route to digestive Armageddon.`,
    `{name} just left a legacy that can't be unclogged without government aid.`,
    `{name} just put the words 'porcelain' and 'catastrophe' in the same sentence.`,
    `{name} just commanded their bowels to perform a filibuster on the toilet.`,
    `{name} just left the ventilation system begging for a career change.`,
    `{name} just proved that even gravity has limits to what it can handle.`,
    `{name} just gave a lecture on "Letting Go," with explosive visual aids.`,
    `{name} just unleashed the kind of stench that unites political parties in fear.`,
    `{name} just authored a 10-volume series called "The Brown Chronicles."`,
    `{name} just made the term 'dirty politics' take on a whole new meaning.`,
    `{name} just performed a live demonstration of Newton's Third Law—every action has an equal and horrifying reaction.`,
    `{name} just woke up the dead with that unearthly odor—zombies are complaining.`,
    `{name} just created a new national emergency, starring their colon as the villain.`,
    `{name} just caused the bathroom mirror to file for a restraining order.`,
    `{name} just held an impeachment trial for last night's dinner, and it was unanimously removed.`,
    `{name} just orchestrated the Great Escape—only it was all from one end.`,
    `{name} just redefined climate change in their personal ozone layer.`,
    `{name} just caused the sewage system to release a press statement: 'We surrender!'`,
    `{name} just graduated from the School of Hard Plops with top honors.`
];

// Function to get a random message and replace {name} with the user's name
function getRandomTelegramMessage(name) {
    const randomIndex = Math.floor(Math.random() * telegramMessages.length);
    const randomMessage = telegramMessages[randomIndex];
    return randomMessage.replace('{name}', name);
}

// Make this function globally available
window.telegramMessages = {
    getRandomTelegramMessage: getRandomTelegramMessage
};