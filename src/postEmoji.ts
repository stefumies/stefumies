const AI_EMOJIS = [
	'🤖', '🧠', '🔮', '💡', '🛸', '⚡', '🌐', '🔬',
	'🧬', '🦾', '🤯', '🎯', '🔭', '🧮', '🪄', '🌌',
	'🧩', '🔧', '💾', '📡', '🖥️', '🧪', '🚀', '🌀',
	'👾', '🔐', '📊', '🌊', '🏗️', '🎲',
];

/** Picks a stable emoji for a given post ID — same post always gets the same emoji. */
export function postEmoji(id: string): string {
	let hash = 0;
	for (let i = 0; i < id.length; i++) {
		hash = (hash * 31 + id.charCodeAt(i)) >>> 0;
	}
	return AI_EMOJIS[hash % AI_EMOJIS.length];
}
