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
('2011/2012', 'La Liga', 'Real Madrid CF', 'Adidas', 90.00, 'Blanco / Dorado', 'Local', 'Jugador', 5,
'https://res.cloudinary.com/dwldyiruu/image/upload/v1770564720/MADRID1_gxgthd.jpg',
'https://res.cloudinary.com/dwldyiruu/image/upload/v1770564720/MADRID1_gxgthd.jpg',
'https://res.cloudinary.com/dwldyiruu/image/upload/v1770564720/MADRID2_yxt8nm.jpg',
'https://res.cloudinary.com/dwldyiruu/image/upload/v1770564720/MADRID3_xlbth1.jpg',
'https://res.cloudinary.com/dwldyiruu/image/upload/v1770564720/MADRID4_tav01h.jpg',
'El Real Madrid de José Mourinho protagonizó una de las temporadas más dominantes en la historia del club durante 2011/12. Cristiano Ronaldo vivió su mejor momento convirtiendo 46 goles en la liga y estableciendo un nuevo récord. El equipo conquistó la Liga española con un récord histórico de 100 puntos y 121 goles marcados en la competición, cifras que aún perduran. La victoria por 1-3 en el Camp Nou quedó grabada en la memoria de todos los madridistas. Esta camiseta Adidas simboliza una era de récords y dominio absoluto en el fútbol español.');

INSERT INTO shirts (season, league, team, brand, price, color, tipo, version, rating, image_url, image_1, image_2, image_3, image_4, description) VALUES
('2007/2008', 'Premier League', 'Manchester United', 'Nike', 85.00, 'Rojo / Blanco / Negro', 'Local', 'Jugador', 4,
'https://res.cloudinary.com/dwldyiruu/image/upload/v1770564720/UNITED1_qeugsn.jpg',
'https://res.cloudinary.com/dwldyiruu/image/upload/v1770564720/UNITED1_qeugsn.jpg',
'https://res.cloudinary.com/dwldyiruu/image/upload/v1770564719/UNITED2_ucm8ki.jpg',
'https://res.cloudinary.com/dwldyiruu/image/upload/v1770564745/UNITED3_lzuxsk.png',
'https://res.cloudinary.com/dwldyiruu/image/upload/v1770564744/UNITED4_d6joqk.png',
'El Manchester United de Sir Alex Ferguson recuperó su trono europeo tras nueve años de sequía en la temporada 2007/08. Cristiano Ronaldo vivió su mejor año como Red Devil, conquistando el Balón de Oro tras marcar 42 goles en la temporada y convirtiéndose en el jugador más decisivo del planeta. La final de Champions League en Moscú contra el Chelsea fue dramática, decidida en los penaltis bajo la lluvia rusa, con el fatídico resbalón de John Terry que le habría dado la copa al Chelsea. Junto a Rooney, Tévez y Giggs, formaron un ataque temible que conquistó tanto la Premier League como la Champions. Muchos expertos consideran a este United como el mejor equipo inglés de la era moderna.');

INSERT INTO shirts (season, league, team, brand, price, color, tipo, version, rating, image_url, image_1, image_2, image_3, image_4, description) VALUES
('2019/2020', 'Premier League', 'Liverpool FC', 'Nike', 100.00, 'Rojo', 'Local', 'Aficionado', 5,
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
('2024/2025', 'Premier League', 'Manchester City', 'Puma', 115.00, 'Azul Claro / Blanco', 'Local', 'Aficionado', 5,
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

INSERT INTO shirts (season, league, team, brand, price, color, tipo, version, rating, image_url, image_1, image_2, image_3, image_4, description) VALUES
('2025/2026', 'La Liga', 'FC Barcelona', 'Nike', 150.00, 'Azul / Granate', 'Local', 'Jugador', 5,
'https://res.cloudinary.com/dwldyiruu/image/upload/v1771237507/BARSA1_vhmexs.jpg',
'https://res.cloudinary.com/dwldyiruu/image/upload/v1771237507/BARSA1_vhmexs.jpg',
'https://res.cloudinary.com/dwldyiruu/image/upload/v1771237507/BARSA2_pzjpz4.jpg',
'https://res.cloudinary.com/dwldyiruu/image/upload/v1771237507/BARSA3_gprj6a.jpg',
'https://res.cloudinary.com/dwldyiruu/image/upload/v1771237507/BARSA4_apidlf.jpg',
'La temporada 2025/26 marca un nuevo capítulo en la historia del FC Barcelona con una camiseta que rinde homenaje a sus orígenes. El diseño presenta las icónicas franjas azulgrana en un degradado moderno que simboliza la transición entre tradición y futuro. Tras años de incertidumbre financiera, el club ha logrado estabilizarse bajo la dirección de Joan Laporta y su proyecto deportivo empieza a dar frutos. La plantilla rejuvenecida combina canteranos formados en La Masia con fichajes estratégicos que han devuelto al equipo a la élite europea. El escudo bordado y los detalles dorados celebran los 126 años de historia del club. Esta equipación Nike representa la esperanza de una nueva era dorada en el Camp Nou, donde una generación de jóvenes talentos busca emular las gestas de Messi, Xavi e Iniesta.');

INSERT INTO shirts (season, league, team, brand, price, color, tipo, version, rating, image_url, image_1, image_2, image_3, image_4, description) VALUES
('2025/2026', 'Ligue 1', 'Paris Saint-Germain', 'Nike', 95.00, 'Azul Marino / Rojo', 'Local', 'Aficionado', 4,
'https://res.cloudinary.com/dwldyiruu/image/upload/v1771237507/PSG1_dvhnmm.jpg',
'https://res.cloudinary.com/dwldyiruu/image/upload/v1771237507/PSG1_dvhnmm.jpg',
'https://res.cloudinary.com/dwldyiruu/image/upload/v1771237507/PSG2_mvbalb.jpg',
'https://res.cloudinary.com/dwldyiruu/image/upload/v1771237547/PSG3_rm2viu.jpg',
'https://res.cloudinary.com/dwldyiruu/image/upload/v1771237532/PSG4_nfubb9.jpg',
'El PSG entra en una nueva era tras la partida de sus megaestrellas Messi, Neymar y Mbappé. Esta camiseta 2025/26 simboliza un cambio de filosofía: menos galácticos individuales y más trabajo colectivo. El diseño presenta la clásica franja roja vertical sobre fondo azul marino, con detalles inspirados en la Torre Eiffel y los monumentos parisinos. Nike ha incorporado su tecnología más avanzada para un rendimiento óptimo. El club, respaldado por Qatar Sports Investments, ahora apuesta por desarrollar talento joven francés combinado con fichajes estratégicos. Aunque ha dominado la Ligue 1 durante años, el gran objetivo sigue siendo conquistar la escurridiza Champions League. Esta equipación representa la ambición renovada de un gigante europeo que busca demostrar que puede triunfar sin depender de nombres mediáticos.');

INSERT INTO shirts (season, league, team, brand, price, color, tipo, version, rating, image_url, image_1, image_2, image_3, image_4, description) VALUES
('2023/2024', 'Serie A', 'Venezia FC', 'Kappa', 90.00, 'Negro / Verde / Naranja', 'Local', 'Jugador', 5,
'https://res.cloudinary.com/dwldyiruu/image/upload/v1771237512/VENEZIA1_zpwfq5.jpg',
'https://res.cloudinary.com/dwldyiruu/image/upload/v1771237512/VENEZIA1_zpwfq5.jpg',
'https://res.cloudinary.com/dwldyiruu/image/upload/v1771237512/VENEZIA2_xjgeh6.jpg',
'https://res.cloudinary.com/dwldyiruu/image/upload/v1771237512/VENEZIA3_rjwefo.jpg',
'https://res.cloudinary.com/dwldyiruu/image/upload/v1771237511/VENEZIA4_srpz6l.jpg',
'El Venezia FC se ha convertido en el equipo más elegante y fashion del fútbol mundial. Esta camiseta 2023/24 es una auténtica obra de arte que fusiona deporte y moda de alta costura. El diseño en negro con detalles en verde y naranja está inspirado en los canales y góndolas de Venecia, creando un efecto visual único. Kappa ha trabajado junto a diseñadores de moda para crear una pieza que trasciende el fútbol. Aunque el club juega en Serie B tras descender, sus camisetas se han convertido en objetos de culto entre coleccionistas y fashionistas de todo el mundo. Celebrities y influencers las lucen en las calles de Milán, París y Nueva York. Esta equipación demuestra que el fútbol puede ser un lienzo para la expresión artística, convirtiendo al Venezia en un fenómeno cultural más allá de los resultados deportivos.');

INSERT INTO shirts (season, league, team, brand, price, color, tipo, version, rating, image_url, image_1, image_2, image_3, image_4, description) VALUES
('2025/2026', 'Serie A', 'AS Roma', 'Adidas', 90.00, 'Verde Menta / Naranja', 'Alternativa', 'Jugador', 4,
'https://res.cloudinary.com/dwldyiruu/image/upload/v1771237508/ROMA1_l6xtid.jpg',
'https://res.cloudinary.com/dwldyiruu/image/upload/v1771237508/ROMA1_l6xtid.jpg',
'https://res.cloudinary.com/dwldyiruu/image/upload/v1771237508/ROMA2_yviufa.jpg',
'https://res.cloudinary.com/dwldyiruu/image/upload/v1771237507/ROMA3_nc3tm1.jpg',
'https://res.cloudinary.com/dwldyiruu/image/upload/v1771237507/ROMA4_nhk5we.jpg',
'La tercera equipación de la Roma 2025/26 ha generado controversia y admiración a partes iguales. Adidas se atrevió con un diseño radical en verde menta con detalles en naranja, colores completamente ajenos a la tradicional paleta giallorossa. Inspirada en las fuentes y jardines de la Roma antigua, esta camiseta representa la osadía y la innovación. Los aficionados más puristas la criticaron inicialmente, pero rápidamente se convirtió en un éxito de ventas global. El diseño moderno y atrevido atrajo a una nueva generación de fans que buscan piezas únicas y diferentes. La Roma, bajo la ambiciosa propiedad americana de los Friedkin, está construyendo un nuevo estadio y un proyecto deportivo competitivo en Europa. Esta equipación simboliza la valentía de romper con lo establecido y mirar hacia el futuro sin olvidar la gloriosa historia del club.');

INSERT INTO users (username, email, password, user_type) VALUES
('cesar_test', 'cesar@test.com', '$2b$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'admin');
