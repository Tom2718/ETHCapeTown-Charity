import Malaria from "../images/charities/malaria.jpeg";
import Keller from "../images/charities/keller.jpeg";
import Worm from "../images/charities/worm.jpeg";

export default [
    {
        name: "Malaria Consortium",
        description: "Treatment to prevent malaria in children in sub-Saharan Africa.",
        charityAddr: "0x3e5e9111ae8eb78fe1cc3bb8915d5d461f3ef9a9",
        img: Malaria,
        projects: [{
            name: "Seasonal Malaria Chemoprevention in Burkina Faso",
            desc: "Seasonal malaria chemoprevention is the administration of antimalarial medicine to children in areas of highly seasonal malaria transmission.",
            projAddr: "0xd03ea8624c8c5987235048901fb614fdca89b117",
            balance: 89811
        },
        {
            name: "Seasonal Malaria Chemoprevention in Chad",
            desc: "Seasonal malaria chemoprevention is the administration of antimalarial medicine to children in areas of highly seasonal malaria transmission.",
            projAddr: "0x1df62f291b2e969fb0849d99d9ce41e2f137006e",
            balance: 98993
        }
        ],
        happyValidators: [
            {
                addr: "0x3e5e9111ae8eb78fe1cc3bb8915d5d461f3ef9a9",
                stake: 1441
            },
            {
                addr: "0x1df62f291b2e969fb0849d99d9ce41e2f137006e",
                stake: 1812
            },
            {
                addr: "0xaca94ef8bd5ffee41947b4585a84bda5a3d3da6e",
                stake: 982
            }
        ],
        sadValidators: [
            {
                addr: "0xd03ea8624c8c5987235048901fb614fdca89b117",
                stake: 554
            }
        ]

    },
    {
        name: "Evidence Action's Deworm the World Initiative",
        description: "Supporting deworming programs in low-income countries.",
        img: Worm
    },
    {
        name: "Helen Keller International",
        description: "Vitamin supplementation to prevent child mortality in sub-Saharan Africa.",
        img: Keller
    }
]

// To add
// - projects
// - claims for
// - claims against
// - verify your service providers (UPort)
