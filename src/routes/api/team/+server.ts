import { json } from '@sveltejs/kit';

export const prerender = true;
interface TeamMember {
    id: number;
    realName: string;
    username: string;
    bio: string;
    github?: string;
    bsky?: string;
    showUser?: boolean;
}

const teamData: TeamMember[] = [
    {
        id: 30270106,
        realName: 'Matthew',
        username: 'Aisuruneko',
        bio: 'Matthew founded the company in 2022. He is a full stack developer and he really enjoys NetroHost, his passion project. Give him a hug!'
    },
    {
        id: 72106503,
        realName: 'John',
        username: 'papertek',
        bio: 'i am papertek! i usually work on designs, websites, hardware, human resources, and public relations. i also like experimenting and iterating on whatever comes to mind!',
        bsky: 'j6chocomint.bsky.social'
    },
    {
        id: 36048627,
        realName: 'Dex',
        username: 'RealDxT',
        bio: 'infrastructure person, chronic linux user & uncertified nerd'
    },
    {
        id: 65809047,
        realName: 'Amal',
        username: 'rottenspaceman',
        bio: "I like working on software and I like learning as well (also I'm a LAZY bum but that's not needed)"
    },
    {
        id: 177717694,
        realName: 'Spenser',
        username: 'co00k1e',
        bio: 'Spenser is a full stack developer whos really good at PHP, MYSQL, C#. He is also a big fan of tea time because he was caught making tea during meetings.'
    },
    {
        id: 79934414,
        realName: 'Ian',
        username: 'parakeet-live',
        bio: 'Ian is a software developer who enjoys working on games and backend. He created Novarin and is also a fan of Just Dance.'
    },
    {
        id: 90116898,
        realName: 'Laith Hijazi',
        username: 'gapva',
        bio: 'Laith is a software developer, game designer, musician, motion graphic artist, and OSS-supporter. He is known for his work on Super Mario 127, Novastra, and Rhythia.'
    },
    {
        id: 0,
        realName: 'Joel',
        username: 'jokerlaul',
        bio: "I'm the accountant. I do not have a GitHub account, but I am a valuable member of the team nonetheless."
    },
    {
        id: 141666866,
        realName: 'Leon',
        username: 'oddbyte',
        bio: 'Leon describes himself as "just a goober who does things" but we see him being obsessed with security and his work. He\'s a full stack developer and a fan of Bazzite Linux.'
    },
    {
        id: 65369281,
        realName: 'Jason',
        username: 'flustix',
        bio: 'A rhythm game dev with a nanahira and choccy milk addiction.'
    },
    {
        id: 50887230,
        realName: 'Alex',
        username: 'xela.codes',
        github: 'itzthemeow',
        bio: 'stupid coding nerd who knows a few things'
    },
    {
        id: 59844890,
        realName: 'Team Netro',
        username: '@NetroSoftware',
        bio: 'The Netro Organization account',
        showUser: false
    }
];

export interface TransformedMember {
    realName: string;
    username: string;
    bio: string;
    bluesky: string;
    github: string;
    avatarSrc: string;
    showUser: boolean;
}

function transformTeam(team: TeamMember[]): TransformedMember[] {
    return team.map((member) => ({
        realName: member.realName,
        username: member.username,
        bio: member.bio,
        bluesky: member.bsky ? `https://bsky.app/profile/${member.bsky}` : '#',
        github: member.id > 0 ? `https://github.com/${member.github || member.username}` : '#',
        avatarSrc: member.id > 0 ? `https://avatars.githubusercontent.com/u/${member.id}` : '/images/avatarplaceholder.svg',
        showUser: member.showUser !== false
    }));
}

export async function GET() {
    const team = transformTeam(teamData);
    return json(team);
}
