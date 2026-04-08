DROP DATABASE IF EXISTS shirtfinder;

CREATE DATABASE shirtfinder CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE shirtfinder;

CREATE TABLE users (
  id_users INT PRIMARY KEY AUTO_INCREMENT,
  username VARCHAR(50) UNIQUE NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  user_type VARCHAR(20) DEFAULT 'user',
  date_registered TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  avatar_url VARCHAR(500) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE shirts (
  id_shirts INT PRIMARY KEY AUTO_INCREMENT,
  season VARCHAR(20),
  league VARCHAR(100),
  team VARCHAR(100),
  brand VARCHAR(50),
  price DECIMAL(10,2),
  color VARCHAR(50),
  tipo VARCHAR(50),
  version VARCHAR(50),
  rating INT DEFAULT 0,
  image_url TEXT,
  image_1 TEXT,
  image_2 TEXT,
  image_3 TEXT,
  image_4 TEXT,
  date_added TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  description TEXT,
  buy_link VARCHAR(255),
  curiosity TEXT,
  buy_link_brand VARCHAR(255)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE comments (
  id_comments INT PRIMARY KEY AUTO_INCREMENT,
  id_post BIGINT,
  user_id INT,
  shirt_id INT,
  text TEXT,
  rating DECIMAL(2,1) DEFAULT 0,
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

CREATE TABLE posts (
  id INT PRIMARY KEY AUTO_INCREMENT,
  title VARCHAR(255) NOT NULL,
  content TEXT NOT NULL,
  category VARCHAR(100) DEFAULT 'General',
  user_id INT NOT NULL,
  attachment_url VARCHAR(500) DEFAULT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  replies_count INT DEFAULT 0,
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

-- IDs forzados con INSERT INTO ... para respetar los huecos (4 y 11 borrados)
INSERT INTO shirts (id_shirts, season, league, team, brand, price, color, tipo, version, rating, image_url, image_1, image_2, image_3, image_4, description, buy_link) VALUES
(1, '2010/2011', 'La Liga', 'FC Barcelona', 'Nike', 95.00, 'Azul / Rojo', 'Local', 'Jugador', 5,
'https://res.cloudinary.com/dwldyiruu/image/upload/v1770564724/BARCELONA1_w6b2xf.jpg',
'https://res.cloudinary.com/dwldyiruu/image/upload/v1770564724/BARCELONA1_w6b2xf.jpg',
'https://res.cloudinary.com/dwldyiruu/image/upload/v1770564722/BARCELONA2_rd8ar3.jpg',
'https://res.cloudinary.com/dwldyiruu/image/upload/v1770564720/BARCELONA3_d2lyi2.jpg',
'https://res.cloudinary.com/dwldyiruu/image/upload/v1770564720/BARCELONA4_axnfxf.jpg',
'La temporada 2010/11 representa una de las épocas más doradas del Barcelona. El equipo de Pep Guardiola dominó Europa con un estilo de juego que revolucionó el fútbol moderno, con el tridente formado por Messi, Villa y Pedro siendo prácticamente imparable. Con Xavi e Iniesta dirigiendo la orquesta desde el mediocampo, el Barça conquistó la Champions League en Wembley venciendo 3-1 al Manchester United en una exhibición de tiki-taka que dejó al mundo con la boca abierta. Messi marcó 53 goles en todas las competiciones, consolidándose como el mejor jugador del planeta. Esta camiseta Nike es considerada por muchos coleccionistas como una de las más icónicas de la historia moderna del club.',
'https://store.fcbarcelona.com/es/collections/kits');

INSERT INTO shirts (id_shirts, season, league, team, brand, price, color, tipo, version, rating, image_url, image_1, image_2, image_3, image_4, description, buy_link) VALUES
(2, '2011/2012', 'La Liga', 'Real Madrid CF', 'Adidas', 90.00, 'Blanco / Dorado', 'Local', 'Jugador', 5,
'https://res.cloudinary.com/dwldyiruu/image/upload/v1770564720/MADRID1_gxgthd.jpg',
'https://res.cloudinary.com/dwldyiruu/image/upload/v1770564720/MADRID1_gxgthd.jpg',
'https://res.cloudinary.com/dwldyiruu/image/upload/v1770564720/MADRID2_yxt8nm.jpg',
'https://res.cloudinary.com/dwldyiruu/image/upload/v1770564720/MADRID3_xlbth1.jpg',
'https://res.cloudinary.com/dwldyiruu/image/upload/v1770564720/MADRID4_tav01h.jpg',
'El Real Madrid de José Mourinho protagonizó una de las temporadas más dominantes en la historia del club durante 2011/12. Cristiano Ronaldo vivió su mejor momento convirtiendo 46 goles en la liga y estableciendo un nuevo récord. El equipo conquistó la Liga española con un récord histórico de 100 puntos y 121 goles marcados en la competición, cifras que aún perduran. La victoria por 1-3 en el Camp Nou quedó grabada en la memoria de todos los madridistas. Esta camiseta Adidas simboliza una era de récords y dominio absoluto en el fútbol español.',
'https://shop.realmadrid.com/collections/jerseys-kits');

INSERT INTO shirts (id_shirts, season, league, team, brand, price, color, tipo, version, rating, image_url, image_1, image_2, image_3, image_4, description, buy_link) VALUES
(3, '2007/2008', 'Premier League', 'Manchester United', 'Nike', 85.00, 'Rojo / Blanco / Negro', 'Local', 'Jugador', 4,
'https://res.cloudinary.com/dwldyiruu/image/upload/v1770564720/UNITED1_qeugsn.jpg',
'https://res.cloudinary.com/dwldyiruu/image/upload/v1770564720/UNITED1_qeugsn.jpg',
'https://res.cloudinary.com/dwldyiruu/image/upload/v1770564719/UNITED2_ucm8ki.jpg',
'https://res.cloudinary.com/dwldyiruu/image/upload/v1770564745/UNITED3_lzuxsk.png',
'https://res.cloudinary.com/dwldyiruu/image/upload/v1770564744/UNITED4_d6joqk.png',
'El Manchester United de Sir Alex Ferguson recuperó su trono europeo tras nueve años de sequía en la temporada 2007/08. Cristiano Ronaldo vivió su mejor año como Red Devil, conquistando el Balón de Oro tras marcar 42 goles en la temporada y convirtiéndose en el jugador más decisivo del planeta. La final de Champions League en Moscú contra el Chelsea fue dramática, decidida en los penaltis bajo la lluvia rusa, con el fatídico resbalón de John Terry que le habría dado la copa al Chelsea. Junto a Rooney, Tévez y Giggs, formaron un ataque temible que conquistó tanto la Premier League como la Champions. Muchos expertos consideran a este United como el mejor equipo inglés de la era moderna.',
'https://store.manutd.com/es-es/c/camiseta');

INSERT INTO shirts (id_shirts, season, league, team, brand, price, color, tipo, version, rating, image_url, image_1, image_2, image_3, image_4, description, buy_link) VALUES
(5, '2025/2026', 'LaLiga', 'Real Betis Balompié', 'Hummel', 90.00, 'Verde / Blanco', 'Local', 'Jugador', 4,
'https://res.cloudinary.com/dwldyiruu/image/upload/v1770564733/BETIS1_tlyxpk.jpg',
'https://res.cloudinary.com/dwldyiruu/image/upload/v1770564733/BETIS1_tlyxpk.jpg',
'https://res.cloudinary.com/dwldyiruu/image/upload/v1770564732/BETIS2_asjn9a.jpg',
'https://res.cloudinary.com/dwldyiruu/image/upload/v1770564731/BETIS3_htd0ml.jpg',
'https://res.cloudinary.com/dwldyiruu/image/upload/v1770564731/BETIS4_sdiixf.webp',
'La equipación Hummel 2025/26 del Real Betis representa un regreso emocional a las raíces del club. Las famosas Trece Barras vertiblancas, símbolo bético desde 1907, vuelven con fuerza en un diseño que fusiona tradición y modernidad de manera magistral. Estas trece barras representan a los trece caballeros que fundaron el club hace más de un siglo. La camiseta incluye detalles ocultos muy especiales: referencias sutiles a la Giralda y al barrio de Heliópolis en el interior del cuello, que solo los béticos más acérrimos reconocen. Hummel se inspiró en los azulejos sevillanos tradicionales para algunos patrones del tejido, creando una pieza que no solo es una camiseta, sino un homenaje a la ciudad de Sevilla. Las ventas batieron récords en las primeras semanas de lanzamiento.',
'https://shop.realbetisbalompie.es/collections/equipaciones');

INSERT INTO shirts (id_shirts, season, league, team, brand, price, color, tipo, version, rating, image_url, image_1, image_2, image_3, image_4, description, buy_link) VALUES
(6, '2024/2025', 'Premier League', 'Manchester City', 'Puma', 115.00, 'Azul Claro / Blanco', 'Local', 'Aficionado', 5,
'https://res.cloudinary.com/dwldyiruu/image/upload/v1770564729/CITY1_ukvxyl.jpg',
'https://res.cloudinary.com/dwldyiruu/image/upload/v1770564729/CITY1_ukvxyl.jpg',
'https://res.cloudinary.com/dwldyiruu/image/upload/v1770564728/CITY2_hto2r7.jpg',
'https://res.cloudinary.com/dwldyiruu/image/upload/v1770564728/CITY3_qja3xu.jpg',
'https://res.cloudinary.com/dwldyiruu/image/upload/v1770564728/CITY4_oa74kv.jpg',
'El Manchester City de Pep Guardiola logró algo histórico en la temporada 2024/25: ganar cuatro Premier Leagues consecutivas, una hazaña nunca antes vista en la historia del fútbol inglés. Pese a perder a jugadores clave como Gündogan, el equipo se reinventó una vez más demostrando su capacidad de adaptación. Erling Haaland continuó su racha goleadora imparable, superando los 35 goles en liga por segunda temporada consecutiva, mientras que Phil Foden y Kevin De Bruyne dirigían el juego desde el mediocampo. Esta camiseta Puma marca el inicio de una nueva era en cuanto a equipamiento del club tras una década vistiendo Nike. El tetracampeonato convierte a este Manchester City en el equipo más dominante de la historia de la Premier League, superando incluso al legendario Manchester United de Sir Alex Ferguson.',
'https://shop.mancity.com/es/es/equipaciones/');

INSERT INTO shirts (id_shirts, season, league, team, brand, price, color, tipo, version, rating, image_url, image_1, image_2, image_3, image_4, description, buy_link) VALUES
(7, '2024/2025', 'Serie A', 'Inter de Milán', 'Nike', 115.00, 'Azul / Negro', 'Local', 'Jugador', 4,
'https://res.cloudinary.com/dwldyiruu/image/upload/v1770564727/INTER1_mdutzf.jpg',
'https://res.cloudinary.com/dwldyiruu/image/upload/v1770564727/INTER1_mdutzf.jpg',
'https://res.cloudinary.com/dwldyiruu/image/upload/v1770564725/INTER2_eto9iq.jpg',
'https://res.cloudinary.com/dwldyiruu/image/upload/v1770564724/INTER3_dz5hpt.jpg',
'https://res.cloudinary.com/dwldyiruu/image/upload/v1770564724/INTER4_s62ldx.jpg',
'El Inter de Milán vivió una temporada de consolidación tras conquistar el Scudetto el año anterior. El equipo de Simone Inzaghi demostró que no fue campeón por casualidad al conseguir su segundo Scudetto consecutivo, rompiendo años de dominio de la Juventus. La camiseta nerazzurra presenta el diseño del Biscione, la serpiente milenaria que es uno de los símbolos más antiguos de Milán, usado por la poderosa familia Visconti desde el siglo XIV. Nike incorporó este diseño de forma sutil en las franjas, visible solo de cerca, creando una pieza llena de historia. Lautaro Martínez se coronó como Pichichi de la Serie A, formando junto a Thuram una dupla goleadora letal, mientras que Calhanoglu dirigía el mediocampo con maestría. El equipo alcanzó las semifinales de la Champions League. Esta camiseta se agotó en Italia en menos de dos semanas tras salir a la venta, convirtiéndose en una de las más vendidas de la historia reciente del Inter.',
'https://store.inter.it/es/match-kits');

INSERT INTO shirts (id_shirts, season, league, team, brand, price, color, tipo, version, rating, image_url, image_1, image_2, image_3, image_4, description, buy_link) VALUES
(8, '2025/2026', 'La Liga', 'FC Barcelona', 'Nike', 150.00, 'Azul / Granate', 'Local', 'Jugador', 5,
'https://res.cloudinary.com/dwldyiruu/image/upload/v1771237507/BARSA1_vhmexs.jpg',
'https://res.cloudinary.com/dwldyiruu/image/upload/v1771237507/BARSA1_vhmexs.jpg',
'https://res.cloudinary.com/dwldyiruu/image/upload/v1771237507/BARSA2_pzjpz4.jpg',
'https://res.cloudinary.com/dwldyiruu/image/upload/v1771237507/BARSA3_gprj6a.jpg',
'https://res.cloudinary.com/dwldyiruu/image/upload/v1771237507/BARSA4_apidlf.jpg',
'La temporada 2025/26 marca un nuevo capítulo en la historia del FC Barcelona con una camiseta que rinde homenaje a sus orígenes. El diseño presenta las icónicas franjas azulgrana en un degradado moderno que simboliza la transición entre tradición y futuro. Tras años de incertidumbre financiera, el club ha logrado estabilizarse bajo la dirección de Joan Laporta y su proyecto deportivo empieza a dar frutos. La plantilla rejuvenecida combina canteranos formados en La Masia con fichajes estratégicos que han devuelto al equipo a la élite europea. El escudo bordado y los detalles dorados celebran los 126 años de historia del club. Esta equipación Nike representa la esperanza de una nueva era dorada en el Camp Nou, donde una generación de jóvenes talentos busca emular las gestas de Messi, Xavi e Iniesta.',
'https://store.fcbarcelona.com/es/collections/kits');

INSERT INTO shirts (id_shirts, season, league, team, brand, price, color, tipo, version, rating, image_url, image_1, image_2, image_3, image_4, description, buy_link) VALUES
(9, '2025/2026', 'Ligue 1', 'Paris Saint-Germain', 'Nike', 95.00, 'Azul Marino / Rojo', 'Local', 'Aficionado', 4,
'https://res.cloudinary.com/dwldyiruu/image/upload/v1771237507/PSG1_dvhnmm.jpg',
'https://res.cloudinary.com/dwldyiruu/image/upload/v1771237507/PSG1_dvhnmm.jpg',
'https://res.cloudinary.com/dwldyiruu/image/upload/v1771237507/PSG2_mvbalb.jpg',
'https://res.cloudinary.com/dwldyiruu/image/upload/v1771237547/PSG3_rm2viu.jpg',
'https://res.cloudinary.com/dwldyiruu/image/upload/v1771237532/PSG4_nfubb9.jpg',
'El PSG entra en una nueva era tras la partida de sus megaestrellas Messi, Neymar y Mbappé. Esta camiseta 2025/26 simboliza un cambio de filosofía: menos galácticos individuales y más trabajo colectivo. El diseño presenta la clásica franja roja vertical sobre fondo azul marino, con detalles inspirados en la Torre Eiffel y los monumentos parisinos. Nike ha incorporado su tecnología más avanzada para un rendimiento óptimo. El club, respaldado por Qatar Sports Investments, ahora apuesta por desarrollar talento joven francés combinado con fichajes estratégicos. Aunque ha dominado la Ligue 1 durante años, el gran objetivo sigue siendo conquistar la escurridiza Champions League. Esta equipación representa la ambición renovada de un gigante europeo que busca demostrar que puede triunfar sin depender de nombres mediáticos.',
'https://store.psg.fr/es/paris-saint-germain-football-kits/t-92646982+d-565009383+z-7-3911137895');

INSERT INTO shirts (id_shirts, season, league, team, brand, price, color, tipo, version, rating, image_url, image_1, image_2, image_3, image_4, description, buy_link) VALUES
(10, '2023/2024', 'Serie A', 'Venezia FC', 'Kappa', 90.00, 'Negro / Verde / Naranja', 'Local', 'Jugador', 5,
'https://res.cloudinary.com/dwldyiruu/image/upload/v1771237512/VENEZIA1_zpwfq5.jpg',
'https://res.cloudinary.com/dwldyiruu/image/upload/v1771237512/VENEZIA1_zpwfq5.jpg',
'https://res.cloudinary.com/dwldyiruu/image/upload/v1771237512/VENEZIA2_xjgeh6.jpg',
'https://res.cloudinary.com/dwldyiruu/image/upload/v1771237512/VENEZIA3_rjwefo.jpg',
'https://res.cloudinary.com/dwldyiruu/image/upload/v1771237511/VENEZIA4_srpz6l.jpg',
'El Venezia FC se ha convertido en el equipo más elegante y fashion del fútbol mundial. Esta camiseta 2023/24 es una auténtica obra de arte que fusiona deporte y moda de alta costura. El diseño en negro con detalles en verde y naranja está inspirado en los canales y góndolas de Venecia, creando un efecto visual único. Kappa ha trabajado junto a diseñadores de moda para crear una pieza que trasciende el fútbol. Aunque el club juega en Serie B tras descender, sus camisetas se han convertido en objetos de culto entre coleccionistas y fashionistas de todo el mundo. Celebrities e influencers las lucen en las calles de Milán, París y Nueva York. Esta equipación demuestra que el fútbol puede ser un lienzo para la expresión artística, convirtiendo al Venezia en un fenómeno cultural más allá de los resultados deportivos.',
'https://shop.veneziafc.it/collections/kits-matchday-25-26');

ALTER TABLE shirts AUTO_INCREMENT = 12;

INSERT INTO users (username, email, password, user_type) VALUES
('cesar_test', 'cesar@test.com', '$2b$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'admin');