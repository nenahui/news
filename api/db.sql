create schema news_database collate utf8mb4_general_ci;
use news_database;

create table news
(
    id        int auto_increment
        primary key,
    title     varchar(255)                       not null,
    content   text                               not null,
    image     varchar(255)                       null,
    createdAt datetime default CURRENT_TIMESTAMP null
);

create table comment
(
    id        int auto_increment
        primary key,
    news_id   int                                not null,
    author    varchar(255)                       null,
    text      text                               not null,
    createdAt datetime default CURRENT_TIMESTAMP null,
    constraint comment_news_id_fk
        foreign key (news_id) references news (id)
            on delete cascade
);

insert into comment (id, news_id, author, text, createdAt)
values  (1, 1, 'John Doe', 'This is unbelievable!', '2024-08-24 19:01:09'),
        (2, 1, 'Jane Smith', 'I am shocked!', '2024-08-24 19:01:09'),
        (3, 2, 'Alice Johnson', 'Can’t wait to try out this new gadget.', '2024-08-24 19:01:09'),
        (4, 2, '', 'Looks cool, but too expensive.', '2024-08-24 19:01:09');

insert into news (id, title, content, image, createdAt)
values  (1, 'Breaking News: Baryte', 'Baryte is a mineral consisting of barium sulfate (BaSO4). Generally white or colorless, it is the main source of the element barium, an alkaline earth metal. It is found across the world and can be deposited through biogenic and hydrothermal processes or evaporation. Early records of baryte date to the 16th century, when a radiating form gained notoriety among alchemists for specimens found near Bologna, Italy. Carl Wilhelm Scheele determined that baryte contained a new element in 1774, but elemental barium was not isolated until 1808 by Humphry Davy, using electrolysis of molten barium salts. Modern uses of baryte include oil and gas drilling, oxygen and sulfur isotopic analysis, and radiometric dating. These crystals of baryte on a dolomite crystal matrix was found at Cerro Warihuyn in Miraflores District, Peru. This photograph was focus-stacked from 24 separate images.', null, '2024-08-24 19:01:09'),
        (2, 'Tech News: Anna Lee Fisher', 'Anna Lee Fisher (née Tingle; born August 24, 1949) is an American chemist, emergency physician and a former NASA astronaut. Formerly married to fellow astronaut Bill Fisher, and the mother of two children, in 1984, she became the first mother to fly in space. During her career at NASA, she was involved with three major programs: the Space Shuttle, the International Space Station and the Orion spacecraft.
A graduate of University of California, Los Angeles (UCLA), where she earned a Bachelor of Science degree in chemistry in 1971, Fisher started graduate school in chemistry, conducting X-ray crystallographic studies of metallocarboranes. The following year she moved to the UCLA School of Medicine, where she received her Doctor of Medicine degree in 1976. She completed her internship at Harbor General Hospital in Torrance, California, in 1977, and chose to specialize in emergency medicine.', null, '2024-08-24 19:01:09');