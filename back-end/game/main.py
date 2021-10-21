import functions as fc

ponto_total_jogador_1 = 0
ponto_total_jogador_2 = 0

while True:
    if ponto_total_jogador_1 == 12:
        print('Ganhador do jogo: Jogador 1')

        break

    elif ponto_total_jogador_2 == 12:
        print('Ganhador do jogo: Jogador 2')

        break

    jogador_1, jogador_2 = fc.distribui_cartas()

    rodada = 0
    pontuacao = [0]
    while rodada != 3:
        carta_1 = jogador_1.pop(fc.seleciona_carta(jogador_1))
        carta_2 = jogador_2.pop(fc.seleciona_carta(jogador_2))

        pontuacao.append(fc.escolhe_maior_carta(carta_1, carta_2))

        if pontuacao.count(1) == 2 or pontuacao.count(2) == 2:
            break

        rodada += 1

    ganhador = fc.ver_quem_ganha(pontuacao)

    if ganhador == 1:  # Jogador 1
        print('Jogador 1 ganhou a partida!')
        ponto_total_jogador_1 += 1

    elif ganhador == 2:  # Jogador 2
        print('Jogador 2 ganhou a partida!')
        ponto_total_jogador_2 += 1

    else:  # Empate
        print('Ninguém ganhou nessa partida.')

    print('=' * 60)

print('O jogo acabou!')
