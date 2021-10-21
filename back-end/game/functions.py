def escolhe_maior_carta(a, b):
    dicionario_das_cartas = {
        # Famílias
        'J_ouro': 1,
        'J_copa': 1,
        'J_pau': 1,
        'J_espada': 1,

        'Q_ouro': 2,
        'Q_copa': 2,
        'Q_pau': 2,
        'Q_espada': 2,

        'K_ouro': 3,
        'K_copa': 3,
        'K_pau': 3,
        'K_espada': 3,

        'A_ouro': 4,
        'A_copa': 4,
        'A_pau': 4,

        # Comuns
        '2_ouro': 5,
        '2_copa': 5,
        '2_pau': 5,
        '2_espada': 5,

        '3_ouro': 6,
        '3_copa': 6,
        '3_pau': 6,
        '3_espada': 6,

        # Manilhas
        'coringa': 7,
        '7_ouro': 8,
        'A_espada': 9,
        '7_copa': 10,
        '4_pau': 11
    }

    carta_1 = dicionario_das_cartas[a]
    carta_2 = dicionario_das_cartas[b]

    if carta_1 > carta_2:

        return 1

    elif carta_1 < carta_2:

        return 2

    else:

        return 3


def distribui_cartas():
    from random import choice

    lista_de_cartas = [
        # Fmílias
        'J_ouro',
        'J_copa',
        'J_pau',
        'J_espada',
        'Q_ouro',
        'Q_copa',
        'Q_pau',
        'Q_espada',
        'K_ouro',
        'K_copa',
        'K_pau',
        'K_espada',
        'A_ouro',
        'A_copa',
        'A_pau',

        # Comuns
        '2_ouro',
        '2_copa',
        '2_pau',
        '2_espada',
        '3_ouro',
        '3_copa',
        '3_pau',
        '3_espada',

        # Manilhas
        'coringa',
        '7_ouro',
        'A_espada',
        '7_copa',
        '4_pau'
    ]

    jogador_1 = list()
    jogador_2 = list()

    for x in range(3):
        carta_1 = lista_de_cartas.index(choice(lista_de_cartas))
        jogador_1.append(lista_de_cartas.pop(carta_1))

        carta_2 = lista_de_cartas.index(choice(lista_de_cartas))
        jogador_2.append(lista_de_cartas.pop(carta_2))

    return jogador_1, jogador_2


def seleciona_carta(jogador):
    print('Qual dessas das suas cartas você deseja jogar?')
    for posicao, carta in enumerate(jogador):
        print(f'{carta}: [{posicao}]')

    resposta = int(input('Escolha o número: '))

    return resposta


def ver_quem_ganha(pontuacao):
    jogador_1 = 1
    jogador_2 = 2
    empate = 3

    # Maioria dos pontos for do jogador 1
    if pontuacao.count(jogador_1) == 2:

        return 1

    # Maioria dos pontos for do jogador 2
    elif pontuacao.count(jogador_2) == 2:

        return 2

    # Empatar na primeira rodada, vence quem fizer a segunda
    elif pontuacao[1] == empate and pontuacao[2] != empate:

        return pontuacao[2]

    # Empatar na segunda rodada, vence quem fizer a primeira
    elif pontuacao[2] == empate and pontuacao[1] != empate:

        return pontuacao[1]

    # Empatar a primeira e a segunda rodada, vence quem fizer a terceira
    elif pontuacao[1] == pontuacao[2] == empate and (pontuacao[3] != empate):

        return pontuacao[3]

    # Empatar a terceira rodada, vence quem fizer a primeira
    elif pontuacao[3] == empate:

        return pontuacao[1]

    # Empatar todas as rodadas, a partida é empatada
    elif pontuacao[1] == pontuacao[2] == pontuacao[3] == empate:

        return pontuacao[1]
