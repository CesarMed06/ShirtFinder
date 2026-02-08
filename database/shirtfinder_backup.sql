DROP DATABASE IF EXISTS shirtfinder;

CREATE DATABASE shirtfinder CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE shirtfinder;

CREATE TABLE users (
    id_users INT PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    user_type VARCHAR(20) DEFAULT 'user',
    date_registered TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE shirts (
    id_shirts INT PRIMARY KEY AUTO_INCREMENT,
    season VARCHAR(20),
    league VARCHAR(100),
    team VARCHAR(100),
    brand VARCHAR(50),
    price DECIMAL(10,2),
    color VARCHAR(50),
    image_url TEXT,
    image_1 TEXT,
    image_2 TEXT,
    image_3 TEXT,
    image_4 TEXT,
    date_added TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    story TEXT,
    key_events TEXT,
    fun_fact TEXT,
    buy_link VARCHAR(255)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE comments (
    id_comments INT PRIMARY KEY AUTO_INCREMENT,
    id_post BIGINT,
    user_id INT,
    shirt_id INT,
    text TEXT,
    date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id_users) ON DELETE CASCADE,
    FOREIGN KEY (shirt_id) REFERENCES shirts(id_shirts) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE favorites (
    id_favorites INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT,
    shirt_id INT,
    date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id_users) ON DELETE CASCADE,
    FOREIGN KEY (shirt_id) REFERENCES shirts(id_shirts) ON DELETE CASCADE,
    UNIQUE KEY unique_favorite (user_id, shirt_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE forum_posts (
    id_post INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT,
    title VARCHAR(255),
    description TEXT,
    image_url TEXT,
    date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id_users) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE notifications (
    id_notifications INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT,
    type VARCHAR(50),
    message TEXT,
    date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    is_read BOOLEAN DEFAULT FALSE,
    FOREIGN KEY (user_id) REFERENCES users(id_users) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO shirts (season, league, team, brand, price, color, image_url, image_1, image_2, image_3, image_4, story, key_events, fun_fact) VALUES
('2010/2011', 'La Liga', 'FC Barcelona', 'Nike', 95.00, 'Azul / Rojo',
'https://res.cloudinary.com/dwidyinuu/image/upload/v1738086647/CTYV1_bhz2r7.jpg',
'https://res.cloudinary.com/dwidyinuu/image/upload/v1738086647/CTYV1_bhz2r7.jpg',
'https://res.cloudinary.com/dwidyinuu/image/upload/v1738086647/CTYV2_hto2r7.jpg',
'https://res.cloudinary.com/dwidyinuu/image/upload/v1738086647/CTYV3_qia3xu.jpg',
'https://res.cloudinary.com/dwidyinuu/image/upload/v1738086647/CTYV4_os74kv.jpg',
'Esta camiseta representa una de las épocas más doradas del Barcelona. Durante la temporada 2010/11, el equipo de Pep Guardiola dominó Europa con un estilo de juego que revolucionó el fútbol moderno. El tridente formado por Messi, Villa y Pedro era imparable, mientras que Xavi e Iniesta dirigían la orquesta desde el centro del campo. La final de Champions en Wembley ante el Manchester United fue una exhibición de tiki-taka que dejó al mundo con la boca abierta.',
'Champions League ganada en Wembley 3-1 contra Manchester United. Liga española conquistada con autoridad. Messi marcó 53 goles en todas las competiciones.',
'Esta camiseta es considerada por muchos coleccionistas como la más icónica de la historia moderna del Barcelona. El diseño Nike con las franjas finas y el patrocinio de la Fundación Qatar Charity la hacen instantáneamente reconocible. Curiosamente, fue la última temporada antes de que el club aceptara publicidad comercial en la camiseta.');

INSERT INTO shirts (season, league, team, brand, price, color, image_url, image_1, image_2, image_3, image_4, story, key_events, fun_fact) VALUES
('2011/2012', 'La Liga', 'Real Madrid CF', 'Adidas', 90.00, 'Verde / Blanco',
'https://res.cloudinary.com/dwidyinuu/image/upload/v1738086728/INTER1_edutff.jpg',
'https://res.cloudinary.com/dwidyinuu/image/upload/v1738086728/INTER1_edutff.jpg',
'https://res.cloudinary.com/dwidyinuu/image/upload/v1738086727/INTER2_ghf9ot.jpg',
'https://res.cloudinary.com/dwidyinuu/image/upload/v1738086725/INTER3_ef90ia.jpg',
'https://res.cloudinary.com/dwidyinuu/image/upload/v1738086724/INTER4_d3f9ot.jpg',
'La temporada 2011/12 marcó un punto de inflexión en la rivalidad Madrid-Barça. José Mourinho construyó un equipo físicamente imponente y mentalmente fuerte, capaz de competir con el Barcelona de Guardiola. Cristiano Ronaldo estaba en su mejor momento, convirtiéndose en una máquina de hacer goles. El equipo rompió múltiples récords históricos, incluyendo los 100 puntos en La Liga y los 121 goles marcados en la competición.',
'Liga española ganada con récord de 100 puntos. Cristiano Ronaldo marcó 46 goles en la liga, estableciendo un nuevo récord. Victoria memorable en el Camp Nou por 1-3.',
'Este Madrid marcó 121 goles en liga, un récord absoluto que aún se mantiene. La camiseta Adidas de ese año tenía detalles dorados que simbolizaban la realeza del club. Curiosamente, pese al éxito liguero, cayeron en semifinales de Champions ante el Bayern en los penaltis, en un partido que aún duele a la afición.');

INSERT INTO shirts (season, league, team, brand, price, color, image_url, image_1, image_2, image_3, image_4, story, key_events, fun_fact) VALUES
('2007/2008', 'Premier League', 'Manchester United', 'Nike', 85.00, 'Verde / Blanco',
'https://res.cloudinary.com/dwidyinuu/image/upload/v1770564728/CTYV1_ukvvy1.jpg',
'https://res.cloudinary.com/dwidyinuu/image/upload/v1770564728/CTYV1_ukvvy1.jpg',
'https://res.cloudinary.com/dwidyinuu/image/upload/v1770564728/CTYV2_hto2r7.jpg',
'https://res.cloudinary.com/dwidyinuu/image/upload/v1770564728/CTYV3_qia3xu.jpg',
'https://res.cloudinary.com/dwidyinuu/image/upload/v1770564728/CTYV4_os74kv.jpg',
'La temporada 2007/08 vio al Manchester United recuperar su trono europeo después de nueve años de sequía. Cristiano Ronaldo vivió su mejor año como Red Devil, ganando el Balón de Oro y convirtiéndose en el jugador más decisivo del planeta. La final de Champions en Moscú contra el Chelsea fue dramática, decidida en los penaltis bajo la lluvia rusa. Rooney, Tévez y Giggs completaban un ataque temible.',
'Champions League conquistada en Moscú ante el Chelsea en penaltis. Premier League ganada con autoridad. Cristiano Ronaldo gana el Balón de Oro con 42 goles en la temporada.',
'Esta camiseta Nike con el patrocinio AIG se convirtió en un símbolo de la última gran era de Sir Alex Ferguson. La final de Moscú es recordada por el penalti fallado de John Terry que le habría dado la Champions al Chelsea. Años después, muchos consideran a ese United como el mejor equipo inglés de la era moderna.');

INSERT INTO shirts (season, league, team, brand, price, color, image_url, image_1, image_2, image_3, image_4, story, key_events, fun_fact) VALUES
('2019/2020', 'Premier League', 'Liverpool FC', 'Nike', 100.00, 'Azul / Negro',
'https://res.cloudinary.com/dwidyinuu/image/upload/v1770564727/CTYV1_ukvvy1.jpg',
'https://res.cloudinary.com/dwidyinuu/image/upload/v1770564727/CTYV1_ukvvy1.jpg',
'https://res.cloudinary.com/dwidyinuu/image/upload/v1770564728/CTYV2_hto2r7.jpg',
'https://res.cloudinary.com/dwidyinuu/image/upload/v1770564725/CTYV3_qia3xu.jpg',
'https://res.cloudinary.com/dwidyinuu/image/upload/v1770564724/CTYV4_os74kv.jpg',
'Después de 30 largos años de espera, el Liverpool de Jürgen Klopp finalmente conquistó la Premier League. El equipo jugaba un fútbol agresivo y emocionante, con un pressing asfixiante y transiciones rapidísimas. Salah, Mané y Firmino formaban un tridente letal, mientras que la defensa liderada por Van Dijk era prácticamente impenetrable. La pandemia detuvo la liga cuando el Liverpool ya tenía el título prácticamente asegurado.',
'Primera Premier League en 30 años para el Liverpool. El título se selló con 7 jornadas de antelación. Récord de 99 puntos en la temporada.',
'Esta camiseta Nike roja se convirtió en histórica al romper tres décadas de sufrimiento para la afición. El Liverpool ganó la liga con tanta autoridad que la celebración tuvo que hacerse de forma virtual debido al COVID-19. Curiosamente, la temporada anterior habían quedado segundos con 97 puntos, la cifra más alta para un subcampeón en la historia de la Premier.');

INSERT INTO shirts (season, league, team, brand, price, color, image_url, image_1, image_2, image_3, image_4, story, key_events, fun_fact) VALUES
('2025/2026', 'LaLiga', 'Real Betis Balompié', 'Hummel', 90.00, 'Verde / Blanco',
'https://res.cloudinary.com/dwidyinuu/image/upload/v1738086424/betis1_mxpmje.jpg',
'https://res.cloudinary.com/dwidyinuu/image/upload/v1738086424/betis1_mxpmje.jpg',
'https://res.cloudinary.com/dwidyinuu/image/upload/v1738086424/betis2_abcdef.jpg',
'https://res.cloudinary.com/dwidyinuu/image/upload/v1738086424/betis3_ghijkl.jpg',
'https://res.cloudinary.com/dwidyinuu/image/upload/v1738086424/betis4_mnopqr.jpg',
'La equipación Hummel 2025/26 del Real Betis representa un regreso a las raíces del club. Las famosas Trece Barras vertiblancas, símbolo bético desde 1907, vuelven con fuerza en un diseño que fusiona tradición y modernidad. El club quiso homenajear su historia mientras mira hacia el futuro. Esta camiseta se ha convertido en un objeto de deseo para los coleccionistas por su belleza y significado cultural.',
'Presentación oficial en el Benito Villamarín con gran acogida de la afición. Colaboración especial entre Hummel y artistas sevillanos para el diseño. Ventas récord en las primeras semanas.',
'Las Trece Barras representan los trece caballeros que fundaron el club en 1907. Esta camiseta incluye detalles ocultos en el cuello que solo los béticos más acérrimos reconocen: pequeñas referencias a la Giralda y al barrio de Heliópolis. Hummel se inspiró en azulejos sevillanos para algunos patrones del tejido.');

INSERT INTO shirts (season, league, team, brand, price, color, image_url, image_1, image_2, image_3, image_4, story, key_events, fun_fact) VALUES
('2024/2025', 'Premier League', 'Manchester City', 'Puma', 115.00, 'Azul / Negro',
'https://res.cloudinary.com/dwidyinuu/image/upload/v1770564227/CITY1_abc123.jpg',
'https://res.cloudinary.com/dwidyinuu/image/upload/v1770564227/CITY1_abc123.jpg',
'https://res.cloudinary.com/dwidyinuu/image/upload/v1770564227/CITY2_def456.jpg',
'https://res.cloudinary.com/dwidyinuu/image/upload/v1770564227/CITY3_ghi789.jpg',
'https://res.cloudinary.com/dwidyinuu/image/upload/v1770564227/CITY4_jkl012.jpg',
'El Manchester City de Guardiola logró algo histórico: ganar cuatro Premier Leagues consecutivas, hazaña nunca vista en la historia del fútbol inglés. Pese a
