import '../App.css';
import '../App.js';
import React from 'react';

function Main_Left() {
  return (
    <div class="menu">
    
      {/* MENU PARA SELECIONAR AS OPÇÕES */}
      
      <ul className='selecao'>
        <li>
          <a href='#'>HOME</a>
        </li>
      </ul>

      <ul className="selecao">
        <li>
          <input type="checkbox" id="sobre" />
          <label for="sobre">Sobre</label>
          <ul>
            <li><a href="#">História</a></li>
            <li><a href="#">Curiosidades</a></li>
            <li><a href="#">Criador</a></li>
          </ul>
        </li>
        <li>
          <input type="checkbox" id="personagens" />
          <label for="personagens">Personagens</label>
          <ul class="selecao">
            <li>
              <input type="checkbox" id="personagens-principais" />
              <label for="personagens-principais">Personagens Principais</label>
              <ul>
                <li>teste</li>
              </ul>
            </li>
          </ul>
          <ul>
            <li>
              <input type="checkbox" id="shinigamis-gotei-13" />
              <label for="shinigamis-gotei-13">Shinigamis Gotei 13</label>
              <ul class="selecao">
                <li>
                  <input type="checkbox" id="1-divisao" />
                  <label for="1-divisao">1° Divisão</label>
                  <ul>
                    <li>teste</li>
                  </ul>
                </li>
                <li>
                  <input type="checkbox" id="2-divisao" />
                  <label for="2-divisao">2° Divisão</label>
                  <ul>
                    <li>teste</li>
                  </ul>
                </li>
                <li>
                  <input type="checkbox" id="3-divisao" />
                  <label for="3-divisao">3° Divisão</label>
                  <ul>
                    <li>teste</li>
                  </ul>
                </li>
                <li>
                  <input type="checkbox" id="4-divisao" />
                  <label for="4-divisao">4° Divisão</label>
                  <ul>
                    <li>teste</li>
                  </ul>
                </li>
                <li>
                  <input type="checkbox" id="5-divisao" />
                  <label for="5-divisao">5° Divisão</label>
                  <ul>
                    <li>teste</li>
                  </ul>
                </li>
                <li>
                  <input type="checkbox" id="6-divisao" />
                  <label for="6-divisao">6° Divisão</label>
                  <ul>
                    <li>teste</li>
                  </ul>
                </li>
                <li>
                  <input type="checkbox" id="7-divisao" />
                  <label for="7-divisao">7° Divisão</label>
                  <ul>
                    <li>teste</li>
                  </ul>
                </li>
                <li>
                  <input type="checkbox" id="8-divisao" />
                  <label for="8-divisao">8° Divisão</label>
                  <ul>
                    <li>teste</li>
                  </ul>
                </li>
                <li>
                  <input type="checkbox" id="9-divisao" />
                  <label for="9-divisao">9° Divisão</label>
                  <ul>
                    <li>teste</li>
                  </ul>
                </li>
                <li>
                  <input type="checkbox" id="10-divisao" />
                  <label for="10-divisao">10° Divisão</label>
                  <ul>
                    <li>teste</li>
                  </ul>
                </li>
                <li>
                  <input type="checkbox" id="11-divisao" />
                  <label for="11-divisao">11° Divisão</label>
                  <ul>
                    <li>teste</li>
                  </ul>
                </li>
                <li>
                  <input type="checkbox" id="12-divisao" />
                  <label for="12-divisao">12° Divisão</label>
                  <ul>
                    <li>teste</li>
                  </ul>
                </li>
                <li>
                  <input type="checkbox" id="13-divisao" />
                  <label for="13-divisao">13° Divisão</label>
                  <ul>
                    <li>teste</li>
                  </ul>
                </li>
                <li>
                  <input type="checkbox" id="0-divisao" />
                  <label for="0-divisao">0° Divisão (Divisão Zero)</label>
                  <ul>
                    <li>teste</li>
                  </ul>
                </li>
              </ul>
            </li>
          </ul>
          <ul class="selecao">
            <li>
              <input type="checkbox" id="hollows" />
              <label for="hollows">Hollows</label>
              <ul>
                <li>
                  <input type="checkbox" id="sobre-hollows" />
                  <label for="sobre-hollows">Sobre</label>
                  <ul>
                    <li>teste</li>
                  </ul>
                </li>
              </ul>
            </li>
          </ul>
          <ul class="selecao">
            <li>
              <input type="checkbox" id="quincy" />
              <label for="quincy">Quincy</label>
              <ul>
                <li>teste</li>
              </ul>
            </li>
          </ul>
          <ul class="selecao">
            <li>
              <input type="checkbox" id="outros" />
              <label for="outros">Outros</label>
              <ul>
                <li>teste</li>
              </ul>
            </li>
          </ul>
        </li>
        <li>
          <input type="checkbox" id="anime" />
          <label for="anime">Anime</label>
          <ul>
            <li><a href="#">Resumo</a></li>
            <li><a href="#">Curiosidades</a></li>
            <li><a href="#">Episódios</a></li>
          </ul>
        </li>
        <li>
          <input type="checkbox" id="manga" />
          <label for="manga">Manga</label>
          <ul>
            <li><a href="#">Edições</a></li>
            <li><a href="#">Diferenças entre o anime</a></li>
          </ul>
        </li>
      </ul>
</div>
  );
}

export default Main_Left;
