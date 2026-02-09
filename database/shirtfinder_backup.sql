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

INSERT INTO shirts (season, league, team, brand, price, color, tipo, version, rating, image_url, image_1, image_2, image_3, image_4, description) VALUES
('2010/2011', 'La Liga', 'FC Barcelona', 'Nike', 95.00, 'Azul / Rojo', 'Local', 'Jugador', 5,
'https://res.cloudinary.com/dwldyiruu/image/upload/v1770564724/BARCELONA1_w6b2xf.jpg',
'https://res.cloudinary.com/dwldyiruu/image/upload/v1770564724/BARCELONA1_w6b2xf.jpg',
'https://res.cloudinary.com/dwldyiruu/image/upload/v1770564722/BARCELONA2_rd8ar3.jpg',
'https://res.cloudinary.com/dwldyiruu/image/upload/v1770564720/BARCELONA3_d2lyi2.jpg',
'https://res.cloudinary.com/dwldyiruu/image/upload/v1770564720/BARCELONA4_axnfxf.jpg',
'La temporada 2010/11 representa una de las épocas más doradas del Barcelona. El equipo de Pep Guardiola dominó Europa con un estilo de juego que revolucionó el fútbol moderno, con el tridente formado por Messi, Villa y Pedro siendo prácticamente imparable. Con Xavi e Iniesta dirigiendo la orquesta desde el mediocampo, el Barça conquistó la Champions League en Wembley venciendo 3-1 al Manchester United en una exhibición de tiki-taka que dejó al mundo con la boca abierta. Messi marcó 53 goles en todas las competiciones, consolidándose como el mejor jugador del planeta. Esta camiseta Nike es considerada por muchos coleccionistas como una de las más icónicas de la historia moderna del club.');

INSERT INTO shirts (season, league, team, brand, price, color, tipo, version, rating, image_url, image_1, image_2, image_3, image_4, description) VALUES
('2011/2012', 'La Liga', 'Real Madrid CF', 'Adidas', 90.00, 'Verde / Blanco', 'Local', 'Jugador', 5,
'https://res.cloudinary.com/dwldyiruu/image/upload/v1770564720/MADRID1_gxgthd.jpg',
'https://res.cloudinary.com/dwldyiruu/image/upload/v1770564720/MADRID1_gxgthd.jpg',
'https://res.cloudinary.com/dwldyiruu/image/upload/v1770564720/MADRID2_yxt8nm.jpg',
'https://res.cloudinary.com/dwldyiruu/image/upload/v1770564720/MADRID3_xlbth1.jpg',
'https://res.cloudinary.com/dwldyiruu/image/upload/v1770564720/MADRID4_tav01h.jpg',
'El Real Madrid de José Mourinho protagonizó una de las temporadas más dominantes en la historia del club durante 2011/12. Cristiano Ronaldo vivió su mejor momento convirtiendo 46 goles en la liga y estableciendo un nuevo récord. El equipo conquistó la Liga española con un récord histórico de 100 puntos y 121 goles marcados en la competición, cifras que aún perduran. La victoria por 1-3 en el Camp Nou quedó grabada en la memoria de todos los madridistas. Esta camiseta Adidas simboliza una era de récords y dominio absoluto en el fútbol español.');

INSERT INTO shirts (season, league, team, brand, price, color, tipo, version, rating, image_url, image_1, image_2, image_3, image_4, description) VALUES
('2007/2008', 'Premier League', 'Manchester United', 'Nike', 85.00, 'Verde / Blanco', 'Local', 'Jugador', 4,
'https://res.cloudinary.com/dwldyiruu/image/upload/v1770564720/UNITED1_qeugsn.jpg',
'https://res.cloudinary.com/dwldyiruu/image/upload/v1770564720/UNITED1_qeugsn.jpg',
'https://res.cloudinary.com/dwldyiruu/image/upload/v1770564719/UNITED2_ucm8ki.jpg',
'https://res.cloudinary.com/dwldyiruu/image/upload/v1770564745/UNITED3_lzuxsk.png',
'https://res.cloudinary.com/dwldyiruu/image/upload/v1770564744/UNITED4_d6joqk.png',
'El Manchester United de Sir Alex Ferguson recuperó su trono europeo tras nueve años de sequía en la temporada 2007/08. Cristiano Ronaldo vivió su mejor año como Red Devil, conquistando el Balón de Oro tras marcar 42 goles en la temporada y convirtiéndose en el jugador más decisivo del planeta. La final de Champions League en Moscú contra el Chelsea fue dramática, decidida en los penaltis bajo la lluvia rusa, con el fatídico resbalón de John Terry que le habría dado la copa al Chelsea. Junto a Rooney, Tévez y Giggs, formaron un ataque temible que conquistó tanto la Premier League como la Champions. Muchos expertos consideran a este United como el mejor equipo inglés de la era moderna.');

INSERT INTO shirts (season, league, team, brand, price, color, tipo, version, rating, image_url, image_1, image_2, image_3, image_4, description) VALUES
('2019/2020', 'Premier League', 'Liverpool FC', 'Nike', 100.00, 'Azul / Negro', 'Local', 'Aficionado', 5,
'https://res.cloudinary.com/dwldyiruu/image/upload/v1770564742/LIVERPOOL1_ewgxsb.jpg',
'https://res.cloudinary.com/dwldyiruu/image/upload/v1770564742/LIVERPOOL1_ewgxsb.jpg',
'https://res.cloudinary.com/dwldyiruu/image/upload/v1770564742/LIVERPOOL2_ot0qa0.jpg',
'https://res.cloudinary.com/dwldyiruu/image/upload/v1770564741/LIVERPOOL3_we4a1u.jpg',
'https://res.cloudinary.com/dwldyiruu/image/upload/v1770564738/LIVERPOOL4_t0up6e.jpg',
'Después de 30 largos años de espera, el Liverpool de Jürgen Klopp finalmente conquistó la Premier League en la temporada 2019/20. El equipo jugaba un fútbol agresivo y emocionante, con un pressing asfixiante y transiciones rapidísimas que destrozaban a los rivales. El tridente formado por Salah, Mané y Firmino era letal, mientras que la defensa liderada por Van Dijk resultaba prácticamente impenetrable. El título se selló con siete jornadas de antelación y un récord de 99 puntos en la temporada. La pandemia de COVID-19 detuvo la liga cuando el Liverpool ya tenía el título asegurado, por lo que la celebración tuvo que hacerse de forma virtual, pero eso no empañó la alegría de romper tres décadas de sufrimiento para la afición.');

INSERT INTO shirts (season, league, team, brand, price, color, tipo, version, rating, image_url, image_1, image_2, image_3, image_4, description) VALUES
('2025/2026', 'LaLiga', 'Real Betis Balompié', 'Hummel', 90.00, 'Verde / Blanco', 'Local', 'Jugador', 4,
'https://res.cloudinary.com/dwldyiruu/image/upload/v1770564733/BETIS1_tlyxpk.jpg',
'https://res.cloudinary.com/dwldyiruu/image/upload/v1770564733/BETIS1_tlyxpk.jpg',
'https://res.cloudinary.com/dwldyiruu/image/upload/v1770564732/BETIS2_asjn9a.jpg',
'https://res.cloudinary.com/dwldyiruu/image/upload/v1770564731/BETIS3_htd0ml.jpg',
'https://res.cloudinary.com/dwldyiruu/image/upload/v1770564731/BETIS4_sdiixf.webp',
'La equipación Hummel 2025/26 del Real Betis representa un regreso emocional a las raíces del club. Las famosas Trece Barras vertiblancas, símbolo bético desde 1907, vuelven con fuerza en un diseño que fusiona tradición y modernidad de manera magistral. Estas trece barras representan a los trece caballeros que fundaron el club hace más de un siglo. La camiseta incluye detalles ocultos muy especiales: referencias sutiles a la Giralda y al barrio de Heliópolis en el interior del cuello, que solo los béticos más acérrimos reconocen. Hummel se inspiró en los azulejos sevillanos tradicionales para algunos patrones del tejido, creando una pieza que no solo es una camiseta, sino un homenaje a la ciudad de Sevilla. Las ventas batieron récords en las primeras semanas de lanzamiento.');

INSERT INTO shirts (season, league, team, brand, price, color, tipo, version, rating, image_url, image_1, image_2, image_3, image_4, description) VALUES
('2024/2025', 'Premier League', 'Manchester City', 'Puma', 115.00, 'Azul / Negro', 'Local', 'Aficionado', 5,
'https://res.cloudinary.com/dwldyiruu/image/upload/v1770564729/CITY1_ukvxyl.jpg',
'https://res.cloudinary.com/dwldyiruu/image/upload/v1770564729/CITY1_ukvxyl.jpg',
'https://res.cloudinary.com/dwldyiruu/image/upload/v1770564728/CITY2_hto2r7.jpg',
'https://res.cloudinary.com/dwldyiruu/image/upload/v1770564728/CITY3_qja3xu.jpg',
'https://res.cloudinary.com/dwldyiruu/image/upload/v1770564728/CITY4_oa74kv.jpg',
'El Manchester City de Pep Guardiola logró algo histórico en la temporada 2024/25: ganar cuatro Premier Leagues consecutivas, una hazaña nunca antes vista en la historia del fútbol inglés. Pese a perder a jugadores clave como Gündogan, el equipo se reinventó una vez más demostrando su capacidad de adaptación. Erling Haaland continuó su racha goleadora imparable, superando los 35 goles en liga por segunda temporada consecutiva, mientras que Phil Foden y Kevin De Bruyne dirigían el juego desde el mediocampo. Esta camiseta Puma marca el inicio de una nueva era en cuanto a equipamiento del club tras una década vistiendo Nike. El tetracampeonato convierte a este Manchester City en el equipo más dominante de la historia de la Premier League, superando incluso al legendario Manchester United de Sir Alex Ferguson.');

INSERT INTO shirts (season, league, team, brand, price, color, tipo, version, rating, image_url, image_1, image_2, image_3, image_4, description) VALUES
('2024/2025', 'Serie A', 'Inter de Milán', 'Nike', 115.00, 'Azul / Negro', 'Local', 'Jugador', 4,
'https://res.cloudinary.com/dwldyiruu/image/upload/v1770564727/INTER1_mdutzf.jpg',
'https://res.cloudinary.com/dwldyiruu/image/upload/v1770564727/INTER1_mdutzf.jpg',
'https://res.cloudinary.com/dwldyiruu/image/upload/v1770564725/INTER2_eto9iq.jpg',
'https://res.cloudinary.com/dwldyiruu/image/upload/v1770564724/INTER3_dz5hpt.jpg',
'https://res.cloudinary.com/dwldyiruu/image/upload/v1770564724/INTER4_s62ldx.jpg',
'El Inter de Milán vivió una temporada de consolidación tras conquistar el Scudetto el año anterior. El equipo de Simone Inzaghi demostró que no fue campeón por casualidad al conseguir su segundo Scudetto consecutivo, rompiendo años de dominio de la Juventus. La camiseta nerazzurra presenta el diseño del Biscione, la serpiente milenaria que es uno de los símbolos más antiguos de Milán, usado por la poderosa familia Visconti desde el siglo XIV. Nike incorporó este diseño de forma sutil en las franjas, visible solo de cerca, creando una pieza llena de historia. Lautaro Martínez se coronó como Pichichi de la Serie A, formando junto a Thuram una dupla goleadora letal, mientras que Calhanoglu dirigía el mediocampo con maestría. El equipo alcanzó las semifinales de la Champions League. Esta camiseta se agotó en Italia en menos de dos semanas tras salir a la venta, convirtiéndose en una de las más vendidas de la historia reciente del Inter.');

INSERT INTO users (username, email, password, user_type) VALUES
('cesar_test', 'cesar@test.com', '$2b$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'admin');

