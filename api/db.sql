create schema news_database collate utf8mb4_general_ci;
use news_database;

create table news
(
    id        int auto_increment
        primary key,
    title     varchar(255)                       not null,
    content   varchar(255)                       not null,
    image     varchar(255)                       null,
    createdAt datetime default CURRENT_TIMESTAMP null
);

create table comment
(
    id      int auto_increment
        primary key,
    news_id int          not null,
    author  varchar(255) null,
    text    varchar(255) not null,
    constraint comment_news_id_fk
        foreign key (news_id) references news (id)
            on delete cascade
);

INSERT INTO news (title, content, image) VALUES
('Breaking News: Major Event Unfolds', 'A major event is currently unfolding in the city...', 'event1.jpg'),
('Tech News: New Gadget Released', 'The latest gadget has just been released...', 'gadget.jpg'),
('Sports Update: Team Wins Championship', 'In an exciting final match, the team clinched the championship...', 'championship.jpg');

INSERT INTO comment (news_id, author, text) VALUES
(1, 'John Doe', 'This is unbelievable!'),
(1, 'Jane Smith', 'I am shocked!'),
(2, 'Alice Johnson', 'Can’t wait to try out this new gadget.'),
(2, NULL, 'Looks cool, but too expensive.'),
(3, 'Michael Brown', 'What a fantastic game!'),
(3, 'David Lee', 'Congratulations to the team!');